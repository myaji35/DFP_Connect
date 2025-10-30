import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // 이메일로 사용자 찾기 (여기에 본인의 이메일을 입력하세요)
  const email = process.argv[2]

  if (!email) {
    console.log('사용법: tsx scripts/make-admin.ts <your-email@example.com>')
    process.exit(1)
  }

  const user = await prisma.userProfile.findUnique({
    where: { email }
  })

  if (!user) {
    console.log(`❌ 사용자를 찾을 수 없습니다: ${email}`)
    console.log('\n등록된 사용자 목록:')
    const allUsers = await prisma.userProfile.findMany({
      select: { email: true, userType: true, firstName: true }
    })
    allUsers.forEach(u => {
      console.log(`  - ${u.email} (${u.firstName || '이름없음'}) - ${u.userType}`)
    })
    process.exit(1)
  }

  if (user.userType === 'ADMIN') {
    console.log(`✅ ${email}은(는) 이미 관리자입니다.`)
    process.exit(0)
  }

  // ADMIN으로 업데이트
  await prisma.userProfile.update({
    where: { email },
    data: { userType: 'ADMIN' }
  })

  console.log(`✅ ${email}을(를) 관리자로 설정했습니다!`)
  console.log('\n이제 /admin 페이지에 접근할 수 있습니다.')
}

main()
  .catch((e) => {
    console.error('❌ 오류 발생:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
