"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface FamilyFormProps {
  onSuccess?: () => void
  initialData?: {
    id?: string
    familyName: string
    familyMemberCount: number
    disabilityType?: string
    disabilityLevel?: string
    specialNotes?: string
    address?: string
    emergencyContact?: string
  }
}

export function FamilyForm({ onSuccess, initialData }: FamilyFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    familyName: initialData?.familyName || '',
    familyMemberCount: initialData?.familyMemberCount || 1,
    disabilityType: initialData?.disabilityType || '',
    disabilityLevel: initialData?.disabilityLevel || '',
    specialNotes: initialData?.specialNotes || '',
    address: initialData?.address || '',
    emergencyContact: initialData?.emergencyContact || '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const url = initialData?.id
        ? `/api/families/${initialData.id}`
        : '/api/families'

      const method = initialData?.id ? 'PATCH' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || '오류가 발생했습니다')
      }

      if (onSuccess) {
        onSuccess()
      } else {
        router.push('/dashboard')
        router.refresh()
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '오류가 발생했습니다')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!initialData?.id) return

    if (!confirm('정말로 이 가족 정보를 삭제하시겠습니까?')) {
      return
    }

    setDeleting(true)
    setError(null)

    try {
      const response = await fetch(`/api/families/${initialData.id}`, {
        method: 'DELETE',
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || '삭제 중 오류가 발생했습니다')
      }

      router.push('/dashboard')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : '삭제 중 오류가 발생했습니다')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-red-700">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="familyName" className="block text-sm font-medium text-gray-700 mb-2">
          가족 이름 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="familyName"
          required
          value={formData.familyName}
          onChange={(e) => setFormData({ ...formData, familyName: e.target.value })}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          placeholder="예: 김철수 가족"
        />
      </div>

      <div>
        <label htmlFor="familyMemberCount" className="block text-sm font-medium text-gray-700 mb-2">
          가족 구성원 수 <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          id="familyMemberCount"
          required
          min="1"
          value={formData.familyMemberCount}
          onChange={(e) => setFormData({ ...formData, familyMemberCount: parseInt(e.target.value) })}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        />
      </div>

      <div>
        <label htmlFor="disabilityType" className="block text-sm font-medium text-gray-700 mb-2">
          장애 유형
        </label>
        <select
          id="disabilityType"
          value={formData.disabilityType}
          onChange={(e) => setFormData({ ...formData, disabilityType: e.target.value })}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        >
          <option value="">선택하세요</option>
          <option value="지체장애">지체장애</option>
          <option value="뇌병변장애">뇌병변장애</option>
          <option value="시각장애">시각장애</option>
          <option value="청각장애">청각장애</option>
          <option value="언어장애">언어장애</option>
          <option value="지적장애">지적장애</option>
          <option value="자폐성장애">자폐성장애</option>
          <option value="정신장애">정신장애</option>
          <option value="신장장애">신장장애</option>
          <option value="심장장애">심장장애</option>
          <option value="호흡기장애">호흡기장애</option>
          <option value="간장애">간장애</option>
          <option value="안면장애">안면장애</option>
          <option value="장루·요루장애">장루·요루장애</option>
          <option value="뇌전증장애">뇌전증장애</option>
          <option value="기타">기타</option>
        </select>
      </div>

      <div>
        <label htmlFor="disabilityLevel" className="block text-sm font-medium text-gray-700 mb-2">
          장애 등급
        </label>
        <select
          id="disabilityLevel"
          value={formData.disabilityLevel}
          onChange={(e) => setFormData({ ...formData, disabilityLevel: e.target.value })}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        >
          <option value="">선택하세요</option>
          <option value="경증(4~6급)">경증 (4~6급)</option>
          <option value="중증(1~3급)">중증 (1~3급)</option>
        </select>
      </div>

      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
          주소
        </label>
        <input
          type="text"
          id="address"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          placeholder="예: 서울시 강남구"
        />
      </div>

      <div>
        <label htmlFor="emergencyContact" className="block text-sm font-medium text-gray-700 mb-2">
          긴급 연락처
        </label>
        <input
          type="tel"
          id="emergencyContact"
          value={formData.emergencyContact}
          onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          placeholder="예: 010-1234-5678"
        />
      </div>

      <div>
        <label htmlFor="specialNotes" className="block text-sm font-medium text-gray-700 mb-2">
          특이사항
        </label>
        <textarea
          id="specialNotes"
          value={formData.specialNotes}
          onChange={(e) => setFormData({ ...formData, specialNotes: e.target.value })}
          rows={4}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          placeholder="서비스 제공 시 고려해야 할 사항이 있다면 입력해주세요"
        />
      </div>

      <div className="space-y-3">
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading || deleting}
            className="flex-1 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-all hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? '처리 중...' : initialData?.id ? '수정하기' : '등록하기'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            disabled={loading || deleting}
            className="rounded-lg border-2 border-gray-300 px-6 py-3 font-semibold text-gray-700 transition-all hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            취소
          </button>
        </div>

        {initialData?.id && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={loading || deleting}
            className="w-full rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition-all hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {deleting ? '삭제 중...' : '가족 정보 삭제'}
          </button>
        )}
      </div>
    </form>
  )
}
