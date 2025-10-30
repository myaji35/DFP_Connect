import { NextRequest, NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const familyUpdateSchema = z.object({
  familyName: z.string().min(1).optional(),
  familyMemberCount: z.number().int().positive().optional(),
  disabilityType: z.string().optional(),
  disabilityLevel: z.string().optional(),
  specialNotes: z.string().optional(),
  address: z.string().optional(),
  emergencyContact: z.string().optional(),
})

// GET: 특정 가족 정보 조회
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

    const family = await prisma.family.findFirst({
      where: {
        id: id,
        userId: userProfile.id  // 본인의 가족 정보만 조회 가능
      }
    })

    if (!family) {
      return NextResponse.json({ error: '가족 정보를 찾을 수 없습니다' }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      family
    })
  } catch (error) {
    console.error('GET /api/families/[id] error:', error)
    return NextResponse.json(
      { error: '가족 정보를 불러오는 중 오류가 발생했습니다' },
      { status: 500 }
    )
  }
}

// PATCH: 가족 정보 수정
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

    const userProfile = await prisma.userProfile.findUnique({
      where: { clerkId: user.id }
    })

    if (!userProfile) {
      return NextResponse.json({ error: '사용자를 찾을 수 없습니다' }, { status: 404 })
    }

    // 본인의 가족 정보인지 확인
    const existingFamily = await prisma.family.findFirst({
      where: {
        id: id,
        userId: userProfile.id
      }
    })

    if (!existingFamily) {
      return NextResponse.json({ error: '가족 정보를 찾을 수 없습니다' }, { status: 404 })
    }

    const body = await request.json()
    const validatedData = familyUpdateSchema.parse(body)

    const updatedFamily = await prisma.family.update({
      where: { id: id },
      data: validatedData
    })

    // 활동 로그 기록
    await prisma.activityLog.create({
      data: {
        userId: userProfile.id,
        action: 'FAMILY_UPDATED',
        description: `가족 정보가 수정되었습니다: ${updatedFamily.familyName}`,
        metadata: JSON.stringify({ familyId: updatedFamily.id })
      }
    })

    return NextResponse.json({
      success: true,
      family: updatedFamily
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: '입력 데이터가 올바르지 않습니다', details: error.errors },
        { status: 400 }
      )
    }

    console.error('PATCH /api/families/[id] error:', error)
    return NextResponse.json(
      { error: '가족 정보 수정 중 오류가 발생했습니다' },
      { status: 500 }
    )
  }
}

// DELETE: 가족 정보 삭제
export async function DELETE(
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

    // 본인의 가족 정보인지 확인
    const existingFamily = await prisma.family.findFirst({
      where: {
        id: id,
        userId: userProfile.id
      }
    })

    if (!existingFamily) {
      return NextResponse.json({ error: '가족 정보를 찾을 수 없습니다' }, { status: 404 })
    }

    await prisma.family.delete({
      where: { id: id }
    })

    // 활동 로그 기록
    await prisma.activityLog.create({
      data: {
        userId: userProfile.id,
        action: 'FAMILY_DELETED',
        description: `가족 정보가 삭제되었습니다: ${existingFamily.familyName}`,
        metadata: JSON.stringify({ familyId: existingFamily.id })
      }
    })

    return NextResponse.json({
      success: true,
      message: '가족 정보가 삭제되었습니다'
    })
  } catch (error) {
    console.error('DELETE /api/families/[id] error:', error)
    return NextResponse.json(
      { error: '가족 정보 삭제 중 오류가 발생했습니다' },
      { status: 500 }
    )
  }
}
