"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle, XCircle } from 'lucide-react'

interface ApplicationActionsProps {
  applicationId: string
}

export function ApplicationActions({ applicationId }: ApplicationActionsProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [adminNotes, setAdminNotes] = useState('')
  const [showNotes, setShowNotes] = useState(false)

  const handleAction = async (status: 'APPROVED' | 'REJECTED') => {
    if (loading) return

    setLoading(true)

    try {
      const response = await fetch(`/api/applications/${applicationId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status,
          adminNotes: adminNotes || undefined
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || '오류가 발생했습니다')
      }

      router.push('/admin')
      router.refresh()
    } catch (error) {
      alert(error instanceof Error ? error.message : '오류가 발생했습니다')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      {showNotes && (
        <div>
          <label htmlFor="adminNotes" className="block text-sm font-medium text-gray-700 mb-2">
            관리자 노트 (선택사항)
          </label>
          <textarea
            id="adminNotes"
            value={adminNotes}
            onChange={(e) => setAdminNotes(e.target.value)}
            rows={3}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            placeholder="처리 사유나 메모를 입력하세요"
          />
        </div>
      )}

      {!showNotes && (
        <button
          onClick={() => setShowNotes(true)}
          className="w-full text-sm text-gray-600 hover:text-gray-900"
        >
          + 관리자 노트 추가
        </button>
      )}

      <div className="flex gap-3">
        <button
          onClick={() => handleAction('APPROVED')}
          disabled={loading}
          className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-3 font-semibold text-white transition-all hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          <CheckCircle className="h-5 w-5" />
          승인
        </button>
        <button
          onClick={() => handleAction('REJECTED')}
          disabled={loading}
          className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-3 font-semibold text-white transition-all hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          <XCircle className="h-5 w-5" />
          거절
        </button>
      </div>
    </div>
  )
}
