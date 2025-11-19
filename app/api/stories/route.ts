import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { storySubmissionSchema, storyFilterSchema } from '@/lib/validations/stories'
import { verifyTurnstileFromRequest } from '@/lib/turnstile'
import { rateLimitByIP, rateLimitConfigs } from '@/lib/rate-limit'
import { encrypt } from '@/lib/crypto'
import { getCachedStories, setCachedStories } from '@/lib/cache'
import {
  apiSuccess,
  apiError,
  apiValidationError,
  apiRateLimitExceeded,
  handleApiError,
} from '@/lib/api-response'

/**
 * GET /api/stories
 *
 * 게시된 스토리 목록 조회 (필터, 검색, 페이지네이션)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const queryParams = {
      category: searchParams.get('category') || undefined,
      search: searchParams.get('search') || undefined,
      page: parseInt(searchParams.get('page') || '1'),
      limit: parseInt(searchParams.get('limit') || '12'),
    }

    // 검증
    const validation = storyFilterSchema.safeParse(queryParams)
    if (!validation.success) {
      return apiValidationError(validation.error)
    }

    const { category, search, page, limit } = validation.data

    // 캐시 확인
    const cacheKey = `stories:${category || 'all'}:${page}:${search || 'none'}`
    const cached = await getCachedStories(category, page)
    if (cached && !search) {
      return apiSuccess({
        stories: cached,
        pagination: {
          page,
          limit,
          total: cached.length,
        },
      })
    }

    // 필터 조건
    const where: any = {
      status: 'PUBLISHED',
    }

    if (category) {
      where.category = category
    }

    if (search) {
      where.OR = [
        { title: { contains: search } },
        { content: { contains: search } },
      ]
    }

    // 총 개수
    const total = await prisma.story.count({ where })

    // 스토리 조회
    const stories = await prisma.story.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { publishedAt: 'desc' },
      select: {
        id: true,
        title: true,
        content: true,
        category: true,
        authorName: true,
        isAnonymous: true,
        featuredImage: true,
        tags: true,
        viewCount: true,
        publishedAt: true,
        createdAt: true,
      },
    })

    // 내용 요약 (첫 200자)
    const storiesWithSummary = stories.map((story) => ({
      ...story,
      summary: story.content.slice(0, 200) + (story.content.length > 200 ? '...' : ''),
      content: undefined, // 목록에서는 전체 내용 제외
    }))

    // 캐시 저장 (검색어 없을 때만)
    if (!search) {
      await setCachedStories(storiesWithSummary, category, page, 300)
    }

    return apiSuccess({
      stories: storiesWithSummary,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    return handleApiError(error)
  }
}

/**
 * POST /api/stories
 *
 * 새로운 스토리 제출
 */
export async function POST(request: NextRequest) {
  try {
    // Rate Limiting 체크
    const rateLimitResult = await rateLimitByIP(
      request,
      rateLimitConfigs.storySubmission
    )

    if (!rateLimitResult.allowed) {
      return apiRateLimitExceeded(rateLimitResult.reset)
    }

    // Turnstile 검증
    const turnstileResult = await verifyTurnstileFromRequest(request)
    if (!turnstileResult.success) {
      return apiError(
        'TURNSTILE_VERIFICATION_FAILED',
        turnstileResult.error || '봇 검증에 실패했습니다',
        undefined,
        400
      )
    }

    // 요청 본문 파싱
    const body = await request.json()

    // 데이터 검증
    const validation = storySubmissionSchema.safeParse(body)
    if (!validation.success) {
      return apiValidationError(validation.error)
    }

    const data = validation.data

    // 민감 정보 암호화
    const encryptedEmail = data.email ? encrypt(data.email) : null
    const encryptedPhone = data.phone ? encrypt(data.phone) : null

    // 스토리 생성
    const story = await prisma.story.create({
      data: {
        title: data.title,
        content: data.content,
        category: data.category,
        authorName: data.isAnonymous ? '익명' : (data.authorName || '익명'),
        isAnonymous: data.isAnonymous,
        email: encryptedEmail,
        phone: encryptedPhone,
        featuredImage: data.featuredImage,
        tags: data.tags || [],
        status: 'PENDING', // 관리자 승인 필요
        // 상태 이력도 함께 생성
        statusHistory: {
          create: {
            toStatus: 'PENDING',
            notes: '스토리 제출 접수',
          },
        },
      },
      select: {
        id: true,
        title: true,
        status: true,
        createdAt: true,
      },
    })

    return apiSuccess(
      {
        storyId: story.id,
        title: story.title,
        status: story.status,
        createdAt: story.createdAt,
      },
      '스토리가 성공적으로 제출되었습니다. 검토 후 게시됩니다.',
      201
    )
  } catch (error) {
    return handleApiError(error)
  }
}
