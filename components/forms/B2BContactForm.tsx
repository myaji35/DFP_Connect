'use client'

import { useState } from 'react'
import { Building2, User, Mail, Phone, FileText, Send } from 'lucide-react'

interface B2BContactFormProps {
  className?: string
}

/**
 * B2B 협력 문의 폼
 *
 * 협력 기관이 전문인력 파견 및 서비스 문의를 위해 사용하는 폼
 */
export function B2BContactForm({ className = '' }: B2BContactFormProps) {
  const [formData, setFormData] = useState({
    organizationName: '',
    contactPerson: '',
    email: '',
    phone: '',
    serviceType: '',
    message: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // TODO: API 엔드포인트 연결
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setSubmitStatus('success')
      setFormData({
        organizationName: '',
        contactPerson: '',
        email: '',
        phone: '',
        serviceType: '',
        message: '',
      })
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 기관명 */}
        <div>
          <label
            htmlFor="organizationName"
            className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
          >
            기관명 <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              id="organizationName"
              name="organizationName"
              value={formData.organizationName}
              onChange={handleChange}
              required
              className="w-full pl-11 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg
                       bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                       focus:ring-2 focus:ring-primary-500 focus:border-transparent
                       transition-colors"
              placeholder="예: 서울시 장애인복지관"
            />
          </div>
        </div>

        {/* 담당자명 */}
        <div>
          <label
            htmlFor="contactPerson"
            className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
          >
            담당자명 <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              id="contactPerson"
              name="contactPerson"
              value={formData.contactPerson}
              onChange={handleChange}
              required
              className="w-full pl-11 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg
                       bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                       focus:ring-2 focus:ring-primary-500 focus:border-transparent
                       transition-colors"
              placeholder="홍길동"
            />
          </div>
        </div>

        {/* 이메일 & 전화번호 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
            >
              이메일 <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-11 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg
                         bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                         focus:ring-2 focus:ring-primary-500 focus:border-transparent
                         transition-colors"
                placeholder="example@email.com"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
            >
              연락처 <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full pl-11 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg
                         bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                         focus:ring-2 focus:ring-primary-500 focus:border-transparent
                         transition-colors"
                placeholder="010-1234-5678"
              />
            </div>
          </div>
        </div>

        {/* 서비스 유형 */}
        <div>
          <label
            htmlFor="serviceType"
            className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
          >
            서비스 유형 <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              id="serviceType"
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
              required
              className="w-full pl-11 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg
                       bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                       focus:ring-2 focus:ring-primary-500 focus:border-transparent
                       transition-colors appearance-none cursor-pointer"
            >
              <option value="">서비스를 선택해주세요</option>
              <option value="teacher">전문 교사 파견</option>
              <option value="counselor">상담사 파견</option>
              <option value="caregiver">돌봄 인력 파견</option>
              <option value="trainer">특수 강사 파견</option>
              <option value="consulting">컨설팅 및 교육</option>
              <option value="other">기타 문의</option>
            </select>
          </div>
        </div>

        {/* 문의 내용 */}
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
          >
            문의 내용 <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                     focus:ring-2 focus:ring-primary-500 focus:border-transparent
                     transition-colors resize-none"
            placeholder="필요하신 서비스와 요청사항을 상세히 작성해주세요."
          />
        </div>

        {/* 제출 버튼 */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 px-6 py-4
                     bg-primary-500 hover:bg-primary-600 text-white font-semibold
                     rounded-lg shadow-lg hover:shadow-xl
                     transition-all duration-300
                     disabled:opacity-50 disabled:cursor-not-allowed
                     focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-800"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>전송 중...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>문의하기</span>
              </>
            )}
          </button>
        </div>

        {/* 성공/실패 메시지 */}
        {submitStatus === 'success' && (
          <div className="p-4 bg-success-light/20 border border-success rounded-lg">
            <p className="text-success-dark dark:text-success-light text-center font-semibold">
              문의가 성공적으로 전송되었습니다. 빠른 시일 내에 연락드리겠습니다.
            </p>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-center font-semibold">
              문의 전송에 실패했습니다. 다시 시도해주세요.
            </p>
          </div>
        )}
      </form>
    </div>
  )
}
