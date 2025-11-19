'use client'

import { useState } from 'react'
import { emergencyCareSchema } from '@/lib/validations/forms'
import { useToast } from '@/components/ui/toast'
import { ButtonLoading } from '@/components/ui/loading'
import { AlertCircle, Phone } from 'lucide-react'
import type { EmergencyFormData, EmergencyFormState, EmergencyFormResponse } from '@/lib/types/emergency-form'

/**
 * 긴급돌봄 요청 폼 컴포넌트
 *
 * 긴급 상황 시 1분 이내에 빠르게 제출할 수 있도록 최소한의 필드만 사용
 */
export function EmergencyForm() {
  const { success, error: showErrorToast } = useToast()

  const [formData, setFormData] = useState<EmergencyFormData>({
    name: '',
    phone: '',
    message: '',
  })

  const [state, setState] = useState<EmergencyFormState>({
    isSubmitting: false,
    error: null,
    fieldErrors: {},
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // 필드 변경 시 해당 필드의 에러 제거
    if (state.fieldErrors[name as keyof typeof state.fieldErrors]) {
      setState((prev) => ({
        ...prev,
        fieldErrors: {
          ...prev.fieldErrors,
          [name]: undefined,
        },
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // 검증 초기화
    setState({
      isSubmitting: true,
      error: null,
      fieldErrors: {},
    })

    try {
      // Zod 검증
      const validation = emergencyCareSchema.safeParse(formData)

      if (!validation.success) {
        const fieldErrors: EmergencyFormState['fieldErrors'] = {}
        validation.error.errors.forEach((err) => {
          const field = err.path[0] as keyof typeof fieldErrors
          fieldErrors[field] = err.message
        })

        setState({
          isSubmitting: false,
          error: '입력 내용을 다시 확인해주세요',
          fieldErrors,
        })
        return
      }

      // API 호출
      const response = await fetch('/api/forms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formType: 'EMERGENCY_CARE',
          ...formData,
        }),
      })

      const result: EmergencyFormResponse = await response.json()

      if (!response.ok || !result.success) {
        // 필드별 에러 처리
        if (result.error?.details) {
          const fieldErrors: EmergencyFormState['fieldErrors'] = {}
          result.error.details.forEach((detail) => {
            if (detail.field) {
              fieldErrors[detail.field as keyof typeof fieldErrors] = detail.message
            }
          })
          setState({
            isSubmitting: false,
            error: result.error.message,
            fieldErrors,
          })
        } else {
          setState({
            isSubmitting: false,
            error: result.error?.message || '요청 처리 중 오류가 발생했습니다',
            fieldErrors: {},
          })
        }
        showErrorToast('제출 실패', result.error?.message || '다시 시도해주세요')
        return
      }

      // 성공 처리
      success(
        '긴급돌봄 요청 접수 완료',
        '최대한 빠르게 연락드리겠습니다. 접수번호: ' + result.data?.submissionId.slice(0, 8)
      )

      // 폼 초기화
      setFormData({
        name: '',
        phone: '',
        message: '',
      })
      setState({
        isSubmitting: false,
        error: null,
        fieldErrors: {},
      })
    } catch (err) {
      console.error('Form submission error:', err)
      setState({
        isSubmitting: false,
        error: '네트워크 오류가 발생했습니다. 다시 시도해주세요.',
        fieldErrors: {},
      })
      showErrorToast('네트워크 오류', '다시 시도해주세요')
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100">
          <Phone className="w-6 h-6 text-red-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">긴급돌봄 요청</h2>
          <p className="text-sm text-gray-600">
            긴급 상황 시 빠르게 도움을 요청하세요
          </p>
        </div>
      </div>

      {/* Alert Banner */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-red-800">
            <p className="font-semibold mb-1">긴급 요청은 최우선으로 처리됩니다</p>
            <p>제출 후 최대한 빠르게 연락드립니다. 24시간 긴급 연락처: <strong>1234-5678</strong></p>
          </div>
        </div>
      </div>

      {/* Global Error */}
      {state.error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-red-800">{state.error}</p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
            이름 <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={state.isSubmitting}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors ${
              state.fieldErrors.name
                ? 'border-red-300 bg-red-50'
                : 'border-gray-300 bg-white'
            }`}
            placeholder="이름을 입력해주세요"
          />
          {state.fieldErrors.name && (
            <p className="mt-1 text-sm text-red-600">{state.fieldErrors.name}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
            연락처 <span className="text-red-600">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            disabled={state.isSubmitting}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors ${
              state.fieldErrors.phone
                ? 'border-red-300 bg-red-50'
                : 'border-gray-300 bg-white'
            }`}
            placeholder="010-1234-5678"
          />
          {state.fieldErrors.phone && (
            <p className="mt-1 text-sm text-red-600">{state.fieldErrors.phone}</p>
          )}
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
            상황 설명 <span className="text-red-600">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            disabled={state.isSubmitting}
            rows={5}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors resize-none ${
              state.fieldErrors.message
                ? 'border-red-300 bg-red-50'
                : 'border-gray-300 bg-white'
            }`}
            placeholder="긴급 상황을 자세히 설명해주세요 (최소 10자)"
          />
          {state.fieldErrors.message && (
            <p className="mt-1 text-sm text-red-600">{state.fieldErrors.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={state.isSubmitting}
          className="w-full bg-red-600 text-white font-bold py-4 px-6 rounded-lg hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          {state.isSubmitting && <ButtonLoading />}
          {state.isSubmitting ? '제출 중...' : '긴급돌봄 요청하기'}
        </button>

        {/* Privacy Notice */}
        <p className="text-xs text-gray-500 text-center">
          제출하신 정보는 긴급돌봄 서비스 제공 목적으로만 사용되며, 안전하게 보호됩니다.
        </p>
      </form>
    </div>
  )
}
