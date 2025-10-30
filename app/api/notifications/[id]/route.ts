import { NextRequest, NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

// PATCH /api/notifications/[id] - 알림 읽음 처리
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
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

    const body = await request.json()

    // 본인의 알림인지 확인
    const notification = await prisma.notification.findFirst({
      where: {
        id,
        userId: userProfile.id
      }
    })

    if (!notification) {
      return NextResponse.json({ error: '알림을 찾을 수 없습니다' }, { status: 404 })
    }

    const updatedNotification = await prisma.notification.update({
      where: { id },
      data: {
        isRead: body.isRead
      }
    })

    return NextResponse.json({ notification: updatedNotification })

  } catch (error) {
    console.error('Notification update error:', error)
    return NextResponse.json(
      { error: '알림 업데이트 중 오류가 발생했습니다' },
      { status: 500 }
    )
  }
}
