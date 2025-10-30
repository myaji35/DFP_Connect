"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface ReservationFormProps {
  applicationId: string
  serviceName: string
  onSuccess?: () => void
}

export function ReservationForm({ applicationId, serviceName, onSuccess }: ReservationFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    reservedDate: '',
    startTime: '',
    endTime: '',
    note: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // 클라이언트 사이드 validation
      if (!formData.reservedDate) {
        throw new Error('예약 날짜를 선택해주세요')
      }

      if (!formData.startTime) {
        throw new Error('시작 시간을 입력해주세요')
      }

      // 날짜 유효성 검사
      const selectedDate = new Date(formData.reservedDate)
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      if (selectedDate < today) {
        throw new Error('과거 날짜는 선택할 수 없습니다')
      }

      // 시간 유효성 검사
      if (formData.endTime && formData.startTime >= formData.endTime) {
        throw new Error('종료 시간은 시작 시간보다 늦어야 합니다')
      }

      const submitData = {
        applicationId,
        reservedDate: formData.reservedDate,
        startTime: formData.startTime,
        endTime: formData.endTime || undefined,
        note: formData.note || undefined,
      }

      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      })

      const data = await response.json()

      if (!response.ok) {
        console.error('Reservation error:', data)
        throw new Error(data.error || '예약 중 오류가 발생했습니다')
      }

      if (onSuccess) {
        onSuccess()
      } else {
        router.push('/dashboard')
        router.refresh()
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '예약 중 오류가 발생했습니다')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-red-700">
          {error}
        </div>
      )}

      <div className="rounded-lg bg-blue-50 border border-blue-200 p-4">
        <p className="text-sm text-blue-700">
          <strong>서비스:</strong> {serviceName}
        </p>
      </div>

      <div>
        <label htmlFor="reservedDate" className="block text-sm font-medium text-gray-700 mb-2">
          예약 날짜 <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          id="reservedDate"
          required
          value={formData.reservedDate}
          onChange={(e) => setFormData({ ...formData, reservedDate: e.target.value })}
          min={new Date().toISOString().split('T')[0]}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        />
        <p className="mt-1 text-xs text-gray-500">
          서비스 제공을 원하시는 날짜를 선택해주세요
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-2">
            시작 시간 <span className="text-red-500">*</span>
          </label>
          <input
            type="time"
            id="startTime"
            required
            value={formData.startTime}
            onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        <div>
          <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-2">
            종료 시간 (선택사항)
          </label>
          <input
            type="time"
            id="endTime"
            value={formData.endTime}
            onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
      </div>

      <div>
        <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-2">
          특이사항 (선택사항)
        </label>
        <textarea
          id="note"
          value={formData.note}
          onChange={(e) => setFormData({ ...formData, note: e.target.value })}
          rows={4}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          placeholder="예약 시 고려해야 할 특별한 사항이 있다면 작성해주세요"
        />
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-all hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? '예약 중...' : '예약하기'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-lg border-2 border-gray-300 px-6 py-3 font-semibold text-gray-700 transition-all hover:bg-gray-50"
        >
          취소
        </button>
      </div>
    </form>
  )
}
