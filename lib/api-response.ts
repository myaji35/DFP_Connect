import { NextResponse } from 'next/server'
import { ZodError } from 'zod'
import type { ApiResponse } from './types'

/**
 * 성공 응답 생성
 */
export function apiSuccess<T>(
  data: T,
  message?: string,
  status: number = 200
): NextResponse<ApiResponse<T>> {
  return NextResponse.json(
    {
      success: true,
      data,
      message,
    },
    { status }
  )
}

/**
 * 에러 응답 생성
 */
export function apiError(
  code: string,
  message: string,
  details?: Array<{ field?: string; message: string }>,
  status: number = 400
): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      error: {
        code,
        message,
        details,
      },
    },
    { status }
  )
}

/**
 * Zod 검증 에러 응답
 */
export function apiValidationError(
  error: ZodError
): NextResponse<ApiResponse> {
  const details = error.issues.map((err) => ({
    field: err.path.join('.'),
    message: err.message,
  }))

  return apiError('VALIDATION_ERROR', '입력값 검증에 실패했습니다', details, 400)
}

/**
 * 인증 에러 응답
 */
export function apiUnauthorized(
  message: string = '인증이 필요합니다'
): NextResponse<ApiResponse> {
  return apiError('UNAUTHORIZED', message, undefined, 401)
}

/**
 * 권한 에러 응답
 */
export function apiForbidden(
  message: string = '권한이 없습니다'
): NextResponse<ApiResponse> {
  return apiError('FORBIDDEN', message, undefined, 403)
}

/**
 * Not Found 에러 응답
 */
export function apiNotFound(
  message: string = '요청한 리소스를 찾을 수 없습니다'
): NextResponse<ApiResponse> {
  return apiError('NOT_FOUND', message, undefined, 404)
}

/**
 * Rate Limit 에러 응답
 */
export function apiRateLimitExceeded(
  resetTime?: number
): NextResponse<ApiResponse> {
  const response = apiError(
    'RATE_LIMIT_EXCEEDED',
    '요청 횟수 제한을 초과했습니다. 잠시 후 다시 시도해주세요.',
    undefined,
    429
  )

  if (resetTime) {
    response.headers.set('X-RateLimit-Reset', resetTime.toString())
  }

  return response
}

/**
 * 서버 에러 응답
 */
export function apiServerError(
  message: string = '서버 오류가 발생했습니다'
): NextResponse<ApiResponse> {
  return apiError('INTERNAL_SERVER_ERROR', message, undefined, 500)
}

/**
 * 예외 처리 헬퍼
 * API Route에서 try-catch로 감싸서 사용
 */
export async function handleApiError(
  error: unknown
): Promise<NextResponse<ApiResponse>> {
  console.error('API Error:', error)

  // Zod 검증 에러
  if (error instanceof ZodError) {
    return apiValidationError(error)
  }

  // 커스텀 에러 (error 객체에 code와 message가 있는 경우)
  if (
    error &&
    typeof error === 'object' &&
    'code' in error &&
    'message' in error
  ) {
    const customError = error as { code: string; message: string; status?: number }
    return apiError(
      customError.code,
      customError.message,
      undefined,
      customError.status || 500
    )
  }

  // 일반 에러
  if (error instanceof Error) {
    return apiServerError(
      process.env.NODE_ENV === 'development'
        ? error.message
        : '서버 오류가 발생했습니다'
    )
  }

  return apiServerError()
}

/**
 * API Route 래퍼 (에러 처리 자동화)
 * 사용 예시:
 *
 * ```typescript
 * export const POST = withApiHandler(async (request) => {
 *   const data = await doSomething()
 *   return apiSuccess(data)
 * })
 * ```
 */
export function withApiHandler(
  handler: (request: Request) => Promise<NextResponse>
) {
  return async (request: Request): Promise<NextResponse> => {
    try {
      return await handler(request)
    } catch (error) {
      return handleApiError(error)
    }
  }
}
