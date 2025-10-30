"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface Service {
  id: string
  name: string
  category: string
  description: string
}

interface Family {
  id: string
  familyName: string
}

export function ServiceApplicationForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [loadingData, setLoadingData] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [services, setServices] = useState<Service[]>([])
  const [families, setFamilies] = useState<Family[]>([])

  const [formData, setFormData] = useState({
    serviceId: '',
    familyId: '',
    preferredDate: '',
    content: '',
  })

  // 서비스 및 가족 정보 불러오기
  useEffect(() => {
    async function loadData() {
      try {
        const [servicesRes, familiesRes] = await Promise.all([
          fetch('/api/services'),
          fetch('/api/families')
        ])

        if (servicesRes.ok) {
          const data = await servicesRes.json()
          setServices(data.services || [])
        }

        if (familiesRes.ok) {
          const data = await familiesRes.json()
          setFamilies(data.families || [])
        }
      } catch (err) {
        console.error('Failed to load data:', err)
      } finally {
        setLoadingData(false)
      }
    }

    loadData()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // 클라이언트 사이드 validation
      if (!formData.serviceId) {
        throw new Error('서비스를 선택해주세요')
      }

      if (formData.content.trim().length < 10) {
        throw new Error('신청 내용을 10자 이상 입력해주세요')
      }

      // 빈 문자열을 undefined로 변환
      const submitData = {
        serviceId: formData.serviceId,
        familyId: formData.familyId || undefined,
        preferredDate: formData.preferredDate || undefined,
        content: formData.content.trim(),
      }

      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      })

      const data = await response.json()

      if (!response.ok) {
        console.error('Application error:', data)
        const errorMsg = data.details
          ? `${data.error}: ${JSON.stringify(data.details)}`
          : data.error || '오류가 발생했습니다'
        throw new Error(errorMsg)
      }

      router.push('/dashboard')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : '오류가 발생했습니다')
    } finally {
      setLoading(false)
    }
  }

  if (loadingData) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-gray-600">데이터를 불러오는 중...</div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-red-700">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="serviceId" className="block text-sm font-medium text-gray-700 mb-2">
          서비스 선택 <span className="text-red-500">*</span>
        </label>
        <select
          id="serviceId"
          required
          value={formData.serviceId}
          onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        >
          <option value="">서비스를 선택하세요</option>
          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.name}
            </option>
          ))}
        </select>
        {formData.serviceId && (
          <p className="mt-2 text-sm text-gray-600">
            {services.find(s => s.id === formData.serviceId)?.description}
          </p>
        )}
      </div>

      {families.length > 0 && (
        <div>
          <label htmlFor="familyId" className="block text-sm font-medium text-gray-700 mb-2">
            가족 정보 선택 (선택사항)
          </label>
          <select
            id="familyId"
            value={formData.familyId}
            onChange={(e) => setFormData({ ...formData, familyId: e.target.value })}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="">선택하지 않음</option>
            {families.map((family) => (
              <option key={family.id} value={family.id}>
                {family.familyName}
              </option>
            ))}
          </select>
          <p className="mt-1 text-xs text-gray-500">
            등록된 가족 정보가 있다면 선택해주세요
          </p>
        </div>
      )}

      <div>
        <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-700 mb-2">
          희망 날짜 (선택사항)
        </label>
        <input
          type="date"
          id="preferredDate"
          value={formData.preferredDate}
          onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
          min={new Date().toISOString().split('T')[0]}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        />
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
          신청 내용 <span className="text-red-500">*</span>
        </label>
        <textarea
          id="content"
          required
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          rows={6}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          placeholder="서비스 신청 사유와 상세한 내용을 작성해주세요 (최소 10자 이상)"
        />
        <p className="mt-1 text-xs text-gray-500">
          현재 상황, 필요한 지원 내용, 특별히 고려해야 할 사항 등을 자세히 작성해주세요
        </p>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-all hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? '신청 중...' : '신청하기'}
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
