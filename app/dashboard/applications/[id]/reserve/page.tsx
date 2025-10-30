import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { ReservationForm } from '@/components/reservation-form'

export default async function ReserveApplicationPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const user = await currentUser()

  if (!user) {
    redirect('/sign-in')
  }

  const userProfile = await prisma.userProfile.findUnique({
    where: { clerkId: user.id }
  })

  if (!userProfile) {
    redirect('/sign-in')
  }

  // 신청 조회 (본인의 승인된 신청만)
  const application = await prisma.serviceApplication.findFirst({
    where: {
      id,
      userId: userProfile.id,
      status: 'APPROVED' // 승인된 신청만
    },
    include: {
      service: true,
      family: true,
    }
  })

  if (!application) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="rounded-lg bg-red-50 border border-red-200 p-6">
          <h2 className="text-lg font-semibold text-red-800 mb-2">예약 불가</h2>
          <p className="text-red-700">
            승인된 서비스 신청을 찾을 수 없습니다. 예약은 승인된 신청에 대해서만 가능합니다.
          </p>
          <a
            href="/dashboard"
            className="inline-block mt-4 text-blue-600 hover:text-blue-700 font-medium"
          >
            대시보드로 돌아가기
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">서비스 예약</h1>
        <p className="text-gray-600">
          승인된 서비스 신청에 대한 예약을 생성합니다
        </p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">신청 정보</h2>
        <div className="space-y-3 text-sm">
          <div>
            <span className="text-gray-600">서비스:</span>
            <p className="font-medium">{application.service.name}</p>
          </div>
          <div>
            <span className="text-gray-600">카테고리:</span>
            <p className="font-medium">{application.service.category}</p>
          </div>
          {application.family && (
            <div>
              <span className="text-gray-600">가족:</span>
              <p className="font-medium">{application.family.familyName}</p>
            </div>
          )}
          <div>
            <span className="text-gray-600">신청 내용:</span>
            <p className="bg-gray-50 rounded p-3 mt-1">{application.content}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold mb-4">예약 정보 입력</h2>
        <ReservationForm
          applicationId={application.id}
          serviceName={application.service.name}
        />
      </div>
    </div>
  )
}
