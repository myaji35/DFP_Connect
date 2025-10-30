import { NextRequest, NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

// POST /api/notifications/mark-all-read - 모든 알림 읽음 처리
export async function POST(request: NextRequest) {
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

    await prisma.notification.updateMany({
      where: {
        userId: userProfile.id,
        isRead: false
      },
      data: {
        isRead: true
      }
    })

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Mark all read error:', error)
    return NextResponse.json(
      { error: '알림 처리 중 오류가 발생했습니다' },
      { status: 500 }
    )
  }
}
