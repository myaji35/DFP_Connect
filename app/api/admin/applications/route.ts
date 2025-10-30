import { NextRequest, NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

// GET: 관리자용 전체 신청 목록 조회
export async function GET(request: NextRequest) {
  try {
    const user = await currentUser()

    if (!user) {
      return NextResponse.json({ error: '인증이 필요합니다' }, { status: 401 })
    }

    // 관리자 권한 확인
    const userProfile = await prisma.userProfile.findUnique({
      where: { clerkId: user.id }
    })

    if (!userProfile || userProfile.userType !== 'ADMIN') {
      return NextResponse.json({ error: '관리자 권한이 필요합니다' }, { status: 403 })
    }

    // URL 파라미터에서 필터링 옵션 가져오기
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')

    const whereClause: any = {}
    if (status) {
      whereClause.status = status
    }

    const applications = await prisma.serviceApplication.findMany({
      where: whereClause,
      include: {
        service: true,
        user: true,
        family: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // 통계 정보
    const stats = await prisma.serviceApplication.groupBy({
      by: ['status'],
      _count: true
    })

    return NextResponse.json({
      success: true,
      applications,
      stats: {
        total: applications.length,
        byStatus: stats.reduce((acc, item) => {
          acc[item.status] = item._count
          return acc
        }, {} as Record<string, number>)
      }
    })
  } catch (error) {
    console.error('GET /api/admin/applications error:', error)
    return NextResponse.json(
      { error: '신청 목록을 불러오는 중 오류가 발생했습니다' },
      { status: 500 }
    )
  }
}
