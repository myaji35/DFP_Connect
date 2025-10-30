import { ReservationList } from '@/components/reservation-list'

export default function ReservationsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">내 예약 관리</h1>
        <p className="text-gray-600">
          승인된 서비스 신청에 대한 예약 내역을 확인하고 관리할 수 있습니다
        </p>
      </div>

      <ReservationList />
    </div>
  )
}
