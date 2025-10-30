import { NextRequest, NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

// GET /api/notifications - 알림 목록 조회
export async function GET(request: NextRequest) {
  try {
    const user = await currentUser()
    if (!user) {
      return NextResponse.json({ error: '로그인이 필요합니다' }, { status: 401 })
    }

    const userProfile = await prisma.userProfile.findUnique({
      where: { clerkId: user.id }
    })

    if (!userProfile) {
      return NextResponse.json({ error: '사용자 프로필을 찾을 수 없습니다' }, { status: 404 })
    }

    const notifications = await prisma.notification.findMany({
      where: {
        userId: userProfile.id
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 50 // 최근 50개만
    })

    return NextResponse.json({ notifications })

  } catch (error) {
    console.error('Notification fetch error:', error)
    return NextResponse.json(
      { error: '알림 목록을 불러오는 중 오류가 발생했습니다' },
      { status: 500 }
    )
  }
}
