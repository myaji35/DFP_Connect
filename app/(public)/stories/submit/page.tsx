'use client'

import { useState } from 'react'
import { storySubmissionSchema } from '@/lib/validations/stories'
import { useToast } from '@/components/ui/toast'
import { ButtonLoading } from '@/components/ui/loading'
import { PenSquare, AlertCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

// Force dynamic rendering
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export default function StorySubmitPage() {
  const router = useRouter()
  const { success, error: showError } = useToast()

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'DAILY_LIFE',
    authorName: '',
    isAnonymous: false,
    email: '',
    phone: '',
    tags: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<any>({})

  const categories = [
    { value: 'PARENTING', label: '육아' },
    { value: 'DAILY_LIFE', label: '일상' },
    { value: 'ADVOCACY', label: '권익옹호' },
    { value: 'SUCCESS', label: '성공사례' },
  ]

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))

    // 에러 제거
    if (errors[name]) {
      setErrors((prev: any) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors({})

    try {
      // 태그 파싱
      const tags = formData.tags
        ? formData.tags.split(',').map((t) => t.trim()).filter(Boolean)
        : []

      // 검증
      const validation = storySubmissionSchema.safeParse({
        ...formData,
        tags,
      })

      if (!validation.success) {
        const fieldErrors: any = {}
        validation.error.issues.forEach((err) => {
          fieldErrors[err.path[0]] = err.message
        })
        setErrors(fieldErrors)
        setIsSubmitting(false)
        return
      }

      // API 호출
      const response = await fetch('/api/stories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, tags }),
      })

      const result = await response.json()

      if (!result.success) {
        showError('제출 실패', result.error?.message || '다시 시도해주세요')
        setIsSubmitting(false)
        return
      }

      success(
        '스토리 제출 완료',
        '검토 후 게시됩니다. 감사합니다!'
      )

      // 목록으로 이동
      setTimeout(() => {
        router.push('/stories')
      }, 2000)
    } catch (error) {
      showError('네트워크 오류', '다시 시도해주세요')
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 mb-6">
            <PenSquare className="w-8 h-8 text-purple-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            이야기 공유하기
          </h1>
          <p className="text-lg text-gray-600">
            여러분의 경험이 다른 가족에게 큰 힘이 됩니다
          </p>
        </div>

        {/* Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-semibold mb-1">안내사항</p>
              <ul className="list-disc list-inside space-y-1">
                <li>제출된 스토리는 관리자 검토 후 게시됩니다</li>
                <li>개인정보는 안전하게 암호화되어 보호됩니다</li>
                <li>익명으로 작성하실 수 있습니다</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              제목 <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              disabled={isSubmitting}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                errors.title ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="이야기 제목을 입력해주세요"
            />
            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              카테고리 <span className="text-red-600">*</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              disabled={isSubmitting}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              내용 <span className="text-red-600">*</span>
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              disabled={isSubmitting}
              rows={12}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none ${
                errors.content ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="이야기를 자유롭게 작성해주세요 (최소 50자)"
            />
            {errors.content && <p className="mt-1 text-sm text-red-600">{errors.content}</p>}
          </div>

          {/* Anonymous */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="isAnonymous"
              checked={formData.isAnonymous}
              onChange={handleChange}
              disabled={isSubmitting}
              className="w-5 h-5 text-purple-600 rounded"
            />
            <label className="text-sm font-medium text-gray-700">
              익명으로 작성하기
            </label>
          </div>

          {/* Author Name (if not anonymous) */}
          {!formData.isAnonymous && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                작성자명
              </label>
              <input
                type="text"
                name="authorName"
                value={formData.authorName}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="표시할 이름"
              />
            </div>
          )}

          {/* Tags */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              태그
            </label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              disabled={isSubmitting}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="쉼표로 구분 (예: 육아, 일상, 학교)"
            />
            <p className="mt-1 text-xs text-gray-500">최대 5개까지 가능합니다</p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-purple-600 text-white font-bold py-4 px-6 rounded-lg hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            {isSubmitting && <ButtonLoading />}
            {isSubmitting ? '제출 중...' : '이야기 제출하기'}
          </button>

          <p className="text-xs text-gray-500 text-center">
            제출하신 스토리는 관리자 검토 후 게시됩니다
          </p>
        </form>
      </div>
    </div>
  )
}
