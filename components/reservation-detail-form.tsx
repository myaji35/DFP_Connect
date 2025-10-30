"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface ReservationDetailFormProps {
  reservation: {
    id: string
    reservedDate: string
    startTime: string
    endTime?: string | null
    note?: string | null
    status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED'
    adminNote?: string | null
    application: {
      service: {
        name: string
        category: string
        description: string
      }
      family?: {
        familyName: string
        relationship: string
        disabilityType?: string | null
      } | null
      user: {
        firstName: string
        lastName: string
        email: string
        phoneNumber?: string | null
      }
      content: string
      preferredDate?: string | null
    }
  }
}

const statusLabels = {
  PENDING: '대기중',
  CONFIRMED: '확정됨',
  COMPLETED: '완료됨',
  CANCELLED: '취소됨',
}

export function ReservationDetailForm({ reservation }: ReservationDetailFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    status: reservation.status,
    adminNote: reservation.adminNote || '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/reservations/${reservation.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || '예약 수정 중 오류가 발생했습니다')
      }

      router.push('/admin/reservations')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : '예약 수정 중 오류가 발생했습니다')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-red-700">
          {error}
        </div>
      )}

      {/* 예약 기본 정보 */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold mb-4">예약 정보</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
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
        {reservation.note && (
          <div className="mt-4">
            <span className="text-gray-600 text-sm">특이사항:</span>
            <p className="mt-1 bg-gray-50 rounded p-3 text-sm">{reservation.note}</p>
          </div>
        )}
      </div>

      {/* 서비스 정보 */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold mb-4">서비스 정보</h2>
        <div className="space-y-3 text-sm">
          <div>
            <span className="text-gray-600">서비스명:</span>
            <p className="font-medium">{reservation.application.service.name}</p>
          </div>
          <div>
            <span className="text-gray-600">카테고리:</span>
            <p className="font-medium">{reservation.application.service.category}</p>
          </div>
          <div>
            <span className="text-gray-600">설명:</span>
            <p className="text-gray-700">{reservation.application.service.description}</p>
          </div>
        </div>
      </div>

      {/* 신청자 정보 */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold mb-4">신청자 정보</h2>
        <div className="space-y-3 text-sm">
          <div>
            <span className="text-gray-600">이름:</span>
            <p className="font-medium">
              {reservation.application.user.lastName}{reservation.application.user.firstName}
            </p>
          </div>
          <div>
            <span className="text-gray-600">이메일:</span>
            <p className="font-medium">{reservation.application.user.email}</p>
          </div>
          {reservation.application.user.phoneNumber && (
            <div>
              <span className="text-gray-600">전화번호:</span>
              <p className="font-medium">{reservation.application.user.phoneNumber}</p>
            </div>
          )}
          {reservation.application.family && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <span className="text-gray-600 font-medium">가족 정보:</span>
              <div className="mt-2 space-y-2">
                <p className="text-sm">
                  <span className="text-gray-600">가족명:</span> {reservation.application.family.familyName}
                </p>
                <p className="text-sm">
                  <span className="text-gray-600">관계:</span> {reservation.application.family.relationship}
                </p>
                {reservation.application.family.disabilityType && (
                  <p className="text-sm">
                    <span className="text-gray-600">장애 유형:</span> {reservation.application.family.disabilityType}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 신청 내용 */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold mb-4">신청 내용</h2>
        <p className="text-sm bg-gray-50 rounded p-4 whitespace-pre-wrap">
          {reservation.application.content}
        </p>
        {reservation.application.preferredDate && (
          <p className="text-xs text-gray-500 mt-2">
            희망 날짜: {new Date(reservation.application.preferredDate).toLocaleDateString('ko-KR')}
          </p>
        )}
      </div>

      {/* 예약 관리 폼 */}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold mb-4">예약 관리</h2>

        <div className="space-y-4">
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
              예약 상태 <span className="text-red-500">*</span>
            </label>
            <select
              id="status"
              required
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="PENDING">{statusLabels.PENDING}</option>
              <option value="CONFIRMED">{statusLabels.CONFIRMED}</option>
              <option value="COMPLETED">{statusLabels.COMPLETED}</option>
              <option value="CANCELLED">{statusLabels.CANCELLED}</option>
            </select>
          </div>

          <div>
            <label htmlFor="adminNote" className="block text-sm font-medium text-gray-700 mb-2">
              관리자 메모
            </label>
            <textarea
              id="adminNote"
              value={formData.adminNote}
              onChange={(e) => setFormData({ ...formData, adminNote: e.target.value })}
              rows={4}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              placeholder="예약에 대한 관리자 메모를 작성해주세요"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-all hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? '저장 중...' : '변경사항 저장'}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="rounded-lg border-2 border-gray-300 px-6 py-3 font-semibold text-gray-700 transition-all hover:bg-gray-50"
            >
              취소
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
