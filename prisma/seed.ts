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

  // 후원 계좌 생성
  const donationAccounts = await Promise.all([
    prisma.donationAccount.create({
      data: {
        bankName: '신한은행',
        accountNumber: '110-123-456789',
        accountHolder: '장애와가족플랫폼 사회적협동조합',
        purpose: '일반 후원',
        isActive: true,
        displayOrder: 1,
      },
    }),
    prisma.donationAccount.create({
      data: {
        bankName: '국민은행',
        accountNumber: '012-34-5678-901',
        accountHolder: '장애와가족플랫폼 사회적협동조합',
        purpose: '긴급돌봄 지원',
        isActive: true,
        displayOrder: 2,
      },
    }),
  ])

  console.log(`Created ${donationAccounts.length} donation accounts`)

  // 샘플 스토리 생성
  const stories = await Promise.all([
    prisma.story.create({
      data: {
        title: '우리 아이의 첫 홈티 경험',
        content: `방과후 홈티 서비스를 이용한 지 3개월이 되었습니다. 처음에는 낯선 사람이 집에 온다는 것에 아이가 불안해했지만, 선생님께서 아이의 눈높이에 맞춰 천천히 다가가 주셨어요.

이제는 선생님 오시는 날을 손꼽아 기다립니다. 아이가 웃음이 많아지고, 새로운 것에 도전하는 용기도 생겼어요. 무엇보다 아이가 행복해하는 모습을 보니 부모로서 정말 감사한 마음입니다.

DFP Connect를 통해 이런 좋은 선생님을 만날 수 있어서 감사합니다.`,
        category: 'SUCCESS',
        authorName: '김OO',
        isAnonymous: false,
        status: 'PUBLISHED',
        publishedAt: new Date(),
        featuredOrder: 1,
        tags: JSON.stringify(['홈티', '성장', '감사']),
      },
    }),
    prisma.story.create({
      data: {
        title: '긴급돌봄이 우리 가족을 구했어요',
        content: `갑자기 보호자가 입원하게 되어 막막했는데, DFP Connect의 긴급돌봄 서비스를 알게 되었습니다.

전화 한 통으로 2시간 만에 전문 돌봄 선생님이 오셨고, 아이를 안전하게 돌봐주셨어요. 입원 기간 동안 마음 편히 치료에 집중할 수 있었습니다.

이런 서비스가 있다는 것을 더 많은 장애인 가족들이 알았으면 좋겠습니다.`,
        category: 'PARENTING',
        authorName: null,
        isAnonymous: true,
        status: 'PUBLISHED',
        publishedAt: new Date(),
        tags: JSON.stringify(['긴급돌봄', '감사']),
      },
    }),
  ])

  console.log(`Created ${stories.length} sample stories`)
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
