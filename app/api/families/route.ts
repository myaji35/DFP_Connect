import { NextRequest, NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

// 가족 정보 생성/수정 스키마
const familySchema = z.object({
  familyName: z.string().min(1, '가족 이름을 입력해주세요'),
  familyMemberCount: z.number().int().positive('가족 구성원 수를 입력해주세요'),
  disabilityType: z.string().optional(),
  disabilityLevel: z.string().optional(),
  specialNotes: z.string().optional(),
  address: z.string().optional(),
  emergencyContact: z.string().optional(),
})

// GET: 사용자의 가족 정보 조회
export async function GET(request: NextRequest) {
  try {
    const user = await currentUser()

    if (!user) {
      return NextResponse.json({ error: '인증이 필요합니다' }, { status: 401 })
    }

    // 사용자 프로필 조회 또는 생성
    let userProfile = await prisma.userProfile.findUnique({
      where: { clerkId: user.id },
      include: {
        families: {
          orderBy: { createdAt: 'desc' }
        }
      }
    })

    if (!userProfile) {
      // 첫 로그인 시 프로필 자동 생성
      userProfile = await prisma.userProfile.create({
        data: {
          clerkId: user.id,
          email: user.emailAddresses[0].emailAddress,
          firstName: user.firstName || null,
          lastName: user.lastName || null,
        },
        include: {
          families: true
        }
      })
    }

    return NextResponse.json({
      success: true,
      families: userProfile.families
    })
  } catch (error) {
    console.error('GET /api/families error:', error)
    return NextResponse.json(
      { error: '가족 정보를 불러오는 중 오류가 발생했습니다' },
      { status: 500 }
    )
  }
}

// POST: 새 가족 정보 등록
export async function POST(request: NextRequest) {
  try {
    const user = await currentUser()

    if (!user) {
      return NextResponse.json({ error: '인증이 필요합니다' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = familySchema.parse(body)

    // 사용자 프로필 조회 또는 생성
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

    // 가족 정보 생성
    const family = await prisma.family.create({
      data: {
        userId: userProfile.id,
        ...validatedData
      }
    })

    // 활동 로그 기록
    await prisma.activityLog.create({
      data: {
        userId: userProfile.id,
        action: 'FAMILY_CREATED',
        description: `새로운 가족 정보가 등록되었습니다: ${family.familyName}`,
        metadata: JSON.stringify({ familyId: family.id })
      }
    })

    return NextResponse.json({
      success: true,
      family
    }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: '입력 데이터가 올바르지 않습니다', details: error.errors },
        { status: 400 }
      )
    }

    console.error('POST /api/families error:', error)
    return NextResponse.json(
      { error: '가족 정보 등록 중 오류가 발생했습니다' },
      { status: 500 }
    )
  }
}
