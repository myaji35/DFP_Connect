import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { ReservationDetailForm } from '@/components/reservation-detail-form'

export default async function AdminReservationDetailPage({
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

  if (!userProfile || userProfile.userType !== 'ADMIN') {
    redirect('/dashboard')
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
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="rounded-lg bg-red-50 border border-red-200 p-6">
          <h2 className="text-lg font-semibold text-red-800 mb-2">예약을 찾을 수 없습니다</h2>
          <a
            href="/admin/reservations"
            className="inline-block mt-4 text-blue-600 hover:text-blue-700 font-medium"
          >
            예약 목록으로 돌아가기
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">예약 상세 관리</h1>
        <p className="text-gray-600">
          예약 상태를 변경하고 관리자 메모를 작성할 수 있습니다
        </p>
      </div>

      <ReservationDetailForm reservation={reservation} />
    </div>
  )
}
