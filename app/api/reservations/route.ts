import { NextRequest, NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

// POST /api/reservations - 예약 생성
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

    const body = await request.json()

    // Validation schema
    const schema = z.object({
      applicationId: z.string().min(1, '신청 ID가 필요합니다'),
      reservedDate: z.string().min(1, '예약 날짜가 필요합니다'),
      startTime: z.string().min(1, '시작 시간이 필요합니다'),
      endTime: z.string().optional(),
      note: z.string().optional(),
    })

    const validatedData = schema.parse(body)

    // 신청 확인
    const application = await prisma.serviceApplication.findFirst({
      where: {
        id: validatedData.applicationId,
        userId: userProfile.id,
        status: 'APPROVED' // 승인된 신청만 예약 가능
      }
    })

    if (!application) {
      return NextResponse.json(
        { error: '승인된 서비스 신청을 찾을 수 없습니다' },
        { status: 404 }
      )
    }

    // 예약 생성
    const reservation = await prisma.serviceReservation.create({
      data: {
        applicationId: validatedData.applicationId,
        reservedDate: new Date(validatedData.reservedDate),
        startTime: validatedData.startTime,
        endTime: validatedData.endTime,
        note: validatedData.note,
        status: 'PENDING', // 예약 대기
      },
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
        action: 'RESERVATION_CREATE',
        description: `예약 생성: ${application.service?.name || '서비스'} - ${validatedData.reservedDate}`,
        metadata: JSON.stringify({
          reservationId: reservation.id,
          applicationId: application.id,
          reservedDate: validatedData.reservedDate,
        }),
      }
    })

    return NextResponse.json({
      message: '예약이 성공적으로 생성되었습니다',
      reservation
    }, { status: 201 })

  } catch (error) {
    console.error('Reservation creation error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: '입력 데이터가 올바르지 않습니다', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: '예약 생성 중 오류가 발생했습니다' },
      { status: 500 }
    )
  }
}

// GET /api/reservations - 예약 목록 조회
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

    // 관리자는 모든 예약 조회, 일반 사용자는 본인 예약만 조회
    const whereCondition = userProfile.userType === 'ADMIN'
      ? {}
      : {
          application: {
            userId: userProfile.id
          }
        }

    const reservations = await prisma.serviceReservation.findMany({
      where: whereCondition,
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
      },
      orderBy: {
        reservedDate: 'desc'
      }
    })

    return NextResponse.json({ reservations })

  } catch (error) {
    console.error('Reservation fetch error:', error)
    return NextResponse.json(
      { error: '예약 목록을 불러오는 중 오류가 발생했습니다' },
      { status: 500 }
    )
  }
}
