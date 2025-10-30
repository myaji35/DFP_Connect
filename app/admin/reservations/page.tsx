import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { ReservationList } from '@/components/reservation-list'

export default async function AdminReservationsPage() {
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

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">예약 관리</h1>
        <p className="text-gray-600">
          모든 서비스 예약을 확인하고 관리할 수 있습니다
        </p>
      </div>

      <ReservationList isAdmin={true} />
    </div>
  )
}
