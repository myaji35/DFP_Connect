import { NextRequest, NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const updateApplicationSchema = z.object({
  status: z.enum(['APPROVED', 'REJECTED', 'COMPLETED', 'CANCELLED']),
  adminNotes: z.string().optional(),
})

// PATCH: 신청 상태 업데이트 (관리자 전용)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
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

    const body = await request.json()
    const validatedData = updateApplicationSchema.parse(body)

    // 신청 존재 여부 확인
    const existingApplication = await prisma.serviceApplication.findUnique({
      where: { id: id },
      include: {
        service: true,
        user: true
      }
    })

    if (!existingApplication) {
      return NextResponse.json({ error: '신청을 찾을 수 없습니다' }, { status: 404 })
    }

    // 신청 상태 업데이트
    const updatedApplication = await prisma.serviceApplication.update({
      where: { id: id },
      data: {
        status: validatedData.status,
        adminNotes: validatedData.adminNotes,
        processedAt: new Date(),
        processedBy: userProfile.id
      },
      include: {
        service: true,
        user: true,
        family: true
      }
    })

    // 활동 로그 기록
    await prisma.activityLog.create({
      data: {
        userId: userProfile.id,
        action: 'APPLICATION_UPDATED',
        description: `신청 상태 변경: ${existingApplication.service.name} - ${validatedData.status}`,
        metadata: JSON.stringify({
          applicationId: updatedApplication.id,
          oldStatus: existingApplication.status,
          newStatus: validatedData.status,
          applicantId: existingApplication.userId
        })
      }
    })

    // 신청자에게 알림 생성
    const statusMessages = {
      APPROVED: {
        title: '서비스 신청이 승인되었습니다',
        message: `${existingApplication.service.name} 신청이 승인되었습니다. 이제 예약을 진행하실 수 있습니다.`
      },
      REJECTED: {
        title: '서비스 신청이 거절되었습니다',
        message: `${existingApplication.service.name} 신청이 거절되었습니다. 자세한 내용은 신청 내역을 확인해주세요.`
      },
      COMPLETED: {
        title: '서비스가 완료되었습니다',
        message: `${existingApplication.service.name} 서비스가 완료되었습니다. 이용해 주셔서 감사합니다.`
      },
      CANCELLED: {
        title: '서비스 신청이 취소되었습니다',
        message: `${existingApplication.service.name} 신청이 취소되었습니다.`
      }
    }

    await prisma.notification.create({
      data: {
        userId: existingApplication.userId,
        type: 'APPLICATION_STATUS',
        title: statusMessages[validatedData.status].title,
        message: statusMessages[validatedData.status].message,
        link: `/dashboard`
      }
    })

    return NextResponse.json({
      success: true,
      application: updatedApplication
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: '입력 데이터가 올바르지 않습니다', details: error.errors },
        { status: 400 }
      )
    }

    console.error('PATCH /api/applications/[id] error:', error)
    return NextResponse.json(
      { error: '신청 처리 중 오류가 발생했습니다' },
      { status: 500 }
    )
  }
}

// GET: 신청 상세 조회
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const user = await currentUser()

    if (!user) {
      return NextResponse.json({ error: '인증이 필요합니다' }, { status: 401 })
    }

    const userProfile = await prisma.userProfile.findUnique({
      where: { clerkId: user.id }
    })

    if (!userProfile) {
      return NextResponse.json({ error: '사용자를 찾을 수 없습니다' }, { status: 404 })
    }

    const application = await prisma.serviceApplication.findUnique({
      where: { id: id },
      include: {
        service: true,
        user: true,
        family: true
      }
    })

    if (!application) {
      return NextResponse.json({ error: '신청을 찾을 수 없습니다' }, { status: 404 })
    }

    // 본인의 신청이거나 관리자만 조회 가능
    if (application.userId !== userProfile.id && userProfile.userType !== 'ADMIN') {
      return NextResponse.json({ error: '권한이 없습니다' }, { status: 403 })
    }

    return NextResponse.json({
      success: true,
      application
    })
  } catch (error) {
    console.error('GET /api/applications/[id] error:', error)
    return NextResponse.json(
      { error: '신청 조회 중 오류가 발생했습니다' },
      { status: 500 }
    )
  }
}
