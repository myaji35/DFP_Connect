import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { formSubmissionSchema } from '@/lib/validations/forms'
import { verifyTurnstileFromRequest } from '@/lib/turnstile'
import { rateLimitByIP, rateLimitConfigs } from '@/lib/rate-limit'
import { encrypt } from '@/lib/crypto'
import {
  apiSuccess,
  apiError,
  apiValidationError,
  apiRateLimitExceeded,
  handleApiError,
} from '@/lib/api-response'

/**
 * POST /api/forms
 *
 * 폼 제출 API
 * - 긴급돌봄, B2B 문의, 파트너십, 후원 문의 등 모든 폼 제출 처리
 * - Turnstile 검증, Rate Limiting 적용
 * - 긴급돌봄의 경우 자동으로 우선순위 HIGH 설정
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Rate Limiting 체크
    const rateLimitResult = await rateLimitByIP(
      request,
      rateLimitConfigs.formSubmission
    )

    if (!rateLimitResult.allowed) {
      return apiRateLimitExceeded(rateLimitResult.reset)
    }

    // 2. Turnstile 검증
    const turnstileResult = await verifyTurnstileFromRequest(request)
    if (!turnstileResult.success) {
      return apiError(
        'TURNSTILE_VERIFICATION_FAILED',
        turnstileResult.error || '봇 검증에 실패했습니다',
        undefined,
        400
      )
    }

    // 3. 요청 본문 파싱
    const body = await request.json()

    // 4. 데이터 검증
    const validation = formSubmissionSchema.safeParse(body)
    if (!validation.success) {
      return apiValidationError(validation.error)
    }

    const data = validation.data

    // 5. 민감 정보 암호화
    const encryptedEmail = data.email ? encrypt(data.email) : null
    const encryptedPhone = encrypt(data.phone)

    // 6. 긴급돌봄인 경우 우선순위 자동 설정
    const priority = data.formType === 'EMERGENCY_CARE' ? 'HIGH' : 'MEDIUM'

    // 7. 폼 제출 데이터 저장
    const formSubmission = await prisma.formSubmission.create({
      data: {
        formType: data.formType,
        name: data.name,
        email: encryptedEmail,
        phone: encryptedPhone,
        organization: data.organization,
        subject: data.subject,
        message: data.message,
        status: 'PENDING',
        priority,
        // 상태 이력도 함께 생성
        statusHistory: {
          create: {
            status: 'PENDING',
            note: '폼 제출 접수',
          },
        },
      },
      select: {
        id: true,
        formType: true,
        status: true,
        priority: true,
        createdAt: true,
      },
    })

    // 8. 성공 응답
    return apiSuccess(
      {
        submissionId: formSubmission.id,
        formType: formSubmission.formType,
        status: formSubmission.status,
        priority: formSubmission.priority,
        createdAt: formSubmission.createdAt,
      },
      data.formType === 'EMERGENCY_CARE'
        ? '긴급돌봄 요청이 접수되었습니다. 최대한 빠르게 연락드리겠습니다.'
        : '문의가 성공적으로 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.',
      201
    )
  } catch (error) {
    return handleApiError(error)
  }
}
