import { NextRequest, NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

// GET /api/reservations/[id] - 예약 상세 조회
export async function GET(
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

    const reservation = await prisma.serviceReservation.findUnique({
      where: { id },
      include: {
        application: {
          include: {
            service: true,
            family: true,
            user: {
              select: {
                firstName: true,
                lastName: true,
                email: true,
                phoneNumber: true,
              }
            }
          }
        }
      }
    })

    if (!reservation) {
      return NextResponse.json({ error: '예약을 찾을 수 없습니다' }, { status: 404 })
    }

    // 권한 확인: 본인의 예약이거나 관리자인 경우만 조회 가능
    if (userProfile.userType !== 'ADMIN' && reservation.application.userId !== userProfile.id) {
      return NextResponse.json({ error: '접근 권한이 없습니다' }, { status: 403 })
    }

    return NextResponse.json({ reservation })

  } catch (error) {
    console.error('Reservation fetch error:', error)
    return NextResponse.json(
      { error: '예약 조회 중 오류가 발생했습니다' },
      { status: 500 }
    )
  }
}

// PATCH /api/reservations/[id] - 예약 수정 (상태 변경 포함)
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

    const reservation = await prisma.serviceReservation.findUnique({
      where: { id },
      include: {
        application: true
      }
    })

    if (!reservation) {
      return NextResponse.json({ error: '예약을 찾을 수 없습니다' }, { status: 404 })
    }

    // 권한 확인
    if (userProfile.userType !== 'ADMIN' && reservation.application.userId !== userProfile.id) {
      return NextResponse.json({ error: '접근 권한이 없습니다' }, { status: 403 })
    }

    const body = await request.json()

    // 일반 사용자는 날짜/시간만 수정 가능, 관리자는 상태도 변경 가능
    const schema = userProfile.userType === 'ADMIN'
      ? z.object({
          reservedDate: z.string().optional(),
          startTime: z.string().optional(),
          endTime: z.string().optional(),
          note: z.string().optional(),
          status: z.enum(['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED']).optional(),
          adminNote: z.string().optional(),
        })
      : z.object({
          reservedDate: z.string().optional(),
          startTime: z.string().optional(),
          endTime: z.string().optional(),
          note: z.string().optional(),
        })

    const validatedData = schema.parse(body)

    // 업데이트 데이터 준비
    const updateData: any = {}
    if (validatedData.reservedDate) updateData.reservedDate = new Date(validatedData.reservedDate)
    if (validatedData.startTime) updateData.startTime = validatedData.startTime
    if (validatedData.endTime !== undefined) updateData.endTime = validatedData.endTime
    if (validatedData.note !== undefined) updateData.note = validatedData.note

    if (userProfile.userType === 'ADMIN') {
      if ('status' in validatedData && validatedData.status) updateData.status = validatedData.status
      if ('adminNote' in validatedData) updateData.adminNote = validatedData.adminNote
    }

    const updatedReservation = await prisma.serviceReservation.update({
      where: { id },
      data: updateData,
      include: {
        application: {
          include: {
            service: true,
            family: true,
          }
        }
      }
    })

    // 활동 로그 생성
    await prisma.activityLog.create({
      data: {
        userId: userProfile.id,
        action: 'RESERVATION_UPDATE',
        description: `예약 수정: ${updatedReservation.id}`,
        metadata: JSON.stringify({
          reservationId: updatedReservation.id,
          changes: validatedData,
        }),
      }
    })

    return NextResponse.json({
      message: '예약이 성공적으로 수정되었습니다',
      reservation: updatedReservation
    })

  } catch (error) {
    console.error('Reservation update error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: '입력 데이터가 올바르지 않습니다', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: '예약 수정 중 오류가 발생했습니다' },
      { status: 500 }
    )
  }
}

// DELETE /api/reservations/[id] - 예약 취소
export async function DELETE(
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

    const reservation = await prisma.serviceReservation.findUnique({
      where: { id },
      include: {
        application: true
      }
    })

    if (!reservation) {
      return NextResponse.json({ error: '예약을 찾을 수 없습니다' }, { status: 404 })
    }

    // 권한 확인
    if (userProfile.userType !== 'ADMIN' && reservation.application.userId !== userProfile.id) {
      return NextResponse.json({ error: '접근 권한이 없습니다' }, { status: 403 })
    }

    // 이미 완료되거나 취소된 예약은 취소 불가
    if (reservation.status === 'COMPLETED' || reservation.status === 'CANCELLED') {
      return NextResponse.json(
        { error: '완료되거나 취소된 예약은 취소할 수 없습니다' },
        { status: 400 }
      )
    }

    // 예약 상태를 CANCELLED로 변경 (삭제하지 않음)
    const cancelledReservation = await prisma.serviceReservation.update({
      where: { id },
      data: {
        status: 'CANCELLED',
        adminNote: userProfile.userType === 'ADMIN'
          ? '관리자가 예약을 취소했습니다'
          : undefined
      }
    })

    // 활동 로그 생성
    await prisma.activityLog.create({
      data: {
        userId: userProfile.id,
        action: 'RESERVATION_CANCEL',
        description: `예약 취소: ${cancelledReservation.id}`,
        metadata: JSON.stringify({
          reservationId: cancelledReservation.id,
        }),
      }
    })

    return NextResponse.json({
      message: '예약이 취소되었습니다',
      reservation: cancelledReservation
    })

  } catch (error) {
    console.error('Reservation cancel error:', error)
    return NextResponse.json(
      { error: '예약 취소 중 오류가 발생했습니다' },
      { status: 500 }
    )
  }
}
