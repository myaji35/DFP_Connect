import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET: 모든 활성 서비스 조회
export async function GET(request: NextRequest) {
  try {
    const services = await prisma.service.findMany({
      where: {
        isActive: true
      },
      orderBy: {
        createdAt: 'asc'
      }
    })

    return NextResponse.json({
      success: true,
      services
    })
  } catch (error) {
    console.error('GET /api/services error:', error)
    return NextResponse.json(
      { error: '서비스 목록을 불러오는 중 오류가 발생했습니다' },
      { status: 500 }
    )
  }
}
