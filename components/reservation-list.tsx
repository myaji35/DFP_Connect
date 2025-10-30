"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface Reservation {
  id: string
  reservedDate: string
  startTime: string
  endTime?: string
  note?: string
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED'
  adminNote?: string
  application: {
    service: {
      name: string
      category: string
    }
    family?: {
      familyName: string
    }
    user: {
      firstName: string
      lastName: string
      email: string
    }
  }
}

const statusLabels = {
  PENDING: '대기중',
  CONFIRMED: '확정됨',
  COMPLETED: '완료됨',
  CANCELLED: '취소됨',
}

const statusColors = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  CONFIRMED: 'bg-green-100 text-green-800',
  COMPLETED: 'bg-blue-100 text-blue-800',
  CANCELLED: 'bg-gray-100 text-gray-800',
}

export function ReservationList({ isAdmin = false }: { isAdmin?: boolean }) {
  const router = useRouter()
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadReservations()
  }, [])

  async function loadReservations() {
    try {
      const response = await fetch('/api/reservations')
      if (!response.ok) {
        throw new Error('예약 목록을 불러올 수 없습니다')
      }
      const data = await response.json()
      setReservations(data.reservations || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : '오류가 발생했습니다')
    } finally {
      setLoading(false)
    }
  }

  async function handleCancel(reservationId: string) {
    if (!confirm('정말로 이 예약을 취소하시겠습니까?')) {
      return
    }

    try {
      const response = await fetch(`/api/reservations/${reservationId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || '예약 취소에 실패했습니다')
      }

      // 목록 새로고침
      await loadReservations()
      router.refresh()
    } catch (err) {
      alert(err instanceof Error ? err.message : '예약 취소 중 오류가 발생했습니다')
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-gray-600">예약 목록을 불러오는 중...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-red-700">
        {error}
      </div>
    )
  }

  if (reservations.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 mb-4">예약 내역이 없습니다</p>
        <button
          onClick={() => router.push('/dashboard')}
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          대시보드로 돌아가기
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {reservations.map((reservation) => (
        <div
          key={reservation.id}
          className="rounded-lg border border-gray-200 bg-white p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {reservation.application.service.name}
              </h3>
              <p className="text-sm text-gray-600">
                {reservation.application.service.category}
              </p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[reservation.status]}`}>
              {statusLabels[reservation.status]}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm mb-4">
            <div>
              <span className="text-gray-600">예약 날짜:</span>
              <p className="font-medium">{new Date(reservation.reservedDate).toLocaleDateString('ko-KR')}</p>
            </div>
            <div>
              <span className="text-gray-600">시간:</span>
              <p className="font-medium">
                {reservation.startTime}
                {reservation.endTime && ` - ${reservation.endTime}`}
              </p>
            </div>
          </div>

          {isAdmin && (
            <div className="mb-4 text-sm">
              <span className="text-gray-600">신청자:</span>
              <p className="font-medium">
                {reservation.application.user.lastName}{reservation.application.user.firstName} ({reservation.application.user.email})
              </p>
              {reservation.application.family && (
                <p className="text-gray-600 text-xs mt-1">
                  가족: {reservation.application.family.familyName}
                </p>
              )}
            </div>
          )}

          {reservation.note && (
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-1">특이사항:</p>
              <p className="text-sm bg-gray-50 rounded p-2">{reservation.note}</p>
            </div>
          )}

          {reservation.adminNote && (
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-1">관리자 메모:</p>
              <p className="text-sm bg-blue-50 rounded p-2">{reservation.adminNote}</p>
            </div>
          )}

          <div className="flex gap-2 pt-4 border-t border-gray-200">
            {isAdmin && (
              <button
                onClick={() => router.push(`/admin/reservations/${reservation.id}`)}
                className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                상세보기
              </button>
            )}
            {reservation.status === 'PENDING' && (
              <button
                onClick={() => handleCancel(reservation.id)}
                className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700"
              >
                취소하기
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
