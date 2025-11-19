import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { apiSuccess, apiNotFound, handleApiError } from '@/lib/api-response'

/**
 * GET /api/stories/[id]
 *
 * 스토리 상세 조회 (조회수 증가)
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // 스토리 조회
    const story = await prisma.story.findUnique({
      where: { id },
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
        status: true,
        publishedAt: true,
        createdAt: true,
      },
    })

    if (!story) {
      return apiNotFound('스토리를 찾을 수 없습니다')
    }

    // 게시되지 않은 스토리는 조회 불가
    if (story.status !== 'PUBLISHED') {
      return apiNotFound('스토리를 찾을 수 없습니다')
    }

    // 조회수 증가
    await prisma.story.update({
      where: { id },
      data: {
        viewCount: {
          increment: 1,
        },
      },
    })

    return apiSuccess({
      ...story,
      viewCount: story.viewCount + 1,
    })
  } catch (error) {
    return handleApiError(error)
  }
}
