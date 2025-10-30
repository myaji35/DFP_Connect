import { NextRequest, NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

// 서비스 신청 스키마
const applicationSchema = z.object({
  serviceId: z.string().min(1, '서비스를 선택해주세요'),
  familyId: z.string().optional(),
  preferredDate: z.string().optional(),
  content: z.string().min(10, '신청 내용을 10자 이상 입력해주세요'),
})

// GET: 사용자의 서비스 신청 목록 조회
export async function GET(request: NextRequest) {
  try {
    const user = await currentUser()

    if (!user) {
      return NextResponse.json({ error: '인증이 필요합니다' }, { status: 401 })
    }

    const userProfile = await prisma.userProfile.findUnique({
      where: { clerkId: user.id },
      include: {
        applications: {
          include: {
            service: true,
            family: true
          },
          orderBy: { createdAt: 'desc' }
        }
      }
    })

    if (!userProfile) {
      return NextResponse.json({ error: '사용자를 찾을 수 없습니다' }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      applications: userProfile.applications
    })
  } catch (error) {
    console.error('GET /api/applications error:', error)
    return NextResponse.json(
      { error: '신청 목록을 불러오는 중 오류가 발생했습니다' },
      { status: 500 }
    )
  }
}

// POST: 새 서비스 신청
export async function POST(request: NextRequest) {
  try {
    const user = await currentUser()

    if (!user) {
      return NextResponse.json({ error: '인증이 필요합니다' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = applicationSchema.parse(body)

    // 사용자 프로필 조회
    let userProfile = await prisma.userProfile.findUnique({
      where: { clerkId: user.id }
    })

    if (!userProfile) {
      userProfile = await prisma.userProfile.create({
        data: {
          clerkId: user.id,
          email: user.emailAddresses[0].emailAddress,
          firstName: user.firstName || null,
          lastName: user.lastName || null,
        }
      })
    }

    // 서비스 존재 여부 확인
    const service = await prisma.service.findUnique({
      where: { id: validatedData.serviceId }
    })

    if (!service) {
      return NextResponse.json(
        { error: '존재하지 않는 서비스입니다' },
        { status: 404 }
      )
    }

    // 가족 정보 확인 (있는 경우)
    if (validatedData.familyId) {
      const family = await prisma.family.findUnique({
        where: {
          id: validatedData.familyId,
          userId: userProfile.id
        }
      })

      if (!family) {
        return NextResponse.json(
          { error: '가족 정보를 찾을 수 없습니다' },
          { status: 404 }
        )
      }
    }

    // 서비스 신청 생성
    const application = await prisma.serviceApplication.create({
      data: {
        userId: userProfile.id,
        serviceId: validatedData.serviceId,
        familyId: validatedData.familyId || null,
        content: validatedData.content,
        preferredDate: validatedData.preferredDate ? new Date(validatedData.preferredDate) : null,
        status: 'PENDING'
      },
      include: {
        service: true,
        family: true
      }
    })

    // 활동 로그 기록
    await prisma.activityLog.create({
      data: {
        userId: userProfile.id,
        action: 'APPLICATION_CREATED',
        description: `새로운 서비스 신청: ${service.name}`,
        metadata: JSON.stringify({
          applicationId: application.id,
          serviceId: service.id,
          serviceName: service.name
        })
      }
    })

    return NextResponse.json({
      success: true,
      application
    }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('POST /api/applications validation error:', error.errors)
      return NextResponse.json(
        { error: '입력 데이터가 올바르지 않습니다', details: error.errors },
        { status: 400 }
      )
    }

    console.error('POST /api/applications error:', error)
    return NextResponse.json(
      { error: '서비스 신청 중 오류가 발생했습니다' },
      { status: 500 }
    )
  }
}
