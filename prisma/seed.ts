import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting seed...')

  // 기존 서비스 삭제
  await prisma.service.deleteMany()

  // 서비스 생성
  const services = await Promise.all([
    prisma.service.create({
      data: {
        name: '긴급돌봄',
        category: 'EMERGENCY_CARE',
        description: '보호자의 갑작스러운 입원이나 긴급 상황 시 즉시 돌봄을 제공합니다. 24시간 긴급 연락이 가능하며, 전문 돌봄 인력이 신속하게 지원합니다.',
        isActive: true,
      },
    }),
    prisma.service.create({
      data: {
        name: '방과후 홈티',
        category: 'HOME_TUTORING',
        description: '아동의 사회성 발달과 맞춤형 교육을 위한 가정방문 서비스입니다. 1:1 전문가 매칭을 통해 개별 맞춤 교육을 제공합니다.',
        isActive: true,
      },
    }),
    prisma.service.create({
      data: {
        name: '개별 상담',
        category: 'COUNSELING',
        description: '우울증, 스트레스 등 정서적 어려움에 대한 전문 상담을 제공합니다. 전문 상담사가 개별 맞춤 상담을 진행합니다.',
        isActive: true,
      },
    }),
    prisma.service.create({
      data: {
        name: '가족 상담',
        category: 'COUNSELING',
        description: '가족 구성원 간의 관계 개선과 소통을 위한 가족 상담 서비스입니다. 전문 가족 상담사가 함께 문제를 해결해 나갑니다.',
        isActive: true,
      },
    }),
    prisma.service.create({
      data: {
        name: '맞춤형 여행',
        category: 'TRAVEL',
        description: '장애인 가족을 위한 특별한 여행을 설계하고 동행하는 서비스입니다. 안전하고 즐거운 추억을 만들어드립니다.',
        isActive: true,
      },
    }),
    prisma.service.create({
      data: {
        name: '전문인력 파견',
        category: 'STAFF_DISPATCH',
        description: '복지기관, 센터, 학교를 위한 전문 강사 및 인력을 파견합니다. B2B 협력 서비스로 검증된 전문가를 제공합니다.',
        isActive: true,
      },
    }),
  ])

  console.log(`Created ${services.length} services`)
  console.log('Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
