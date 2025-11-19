'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AlertCircle, RefreshCw, Home } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // 에러 로깅
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-md w-full text-center">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="rounded-full bg-red-100 p-6">
            <AlertCircle className="w-16 h-16 text-red-600" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          문제가 발생했습니다
        </h1>

        {/* Description */}
        <p className="text-gray-600 mb-2">
          일시적인 오류로 페이지를 표시할 수 없습니다.
        </p>
        {process.env.NODE_ENV === 'development' && error.message && (
          <p className="text-sm text-red-600 mb-6 p-4 bg-red-50 rounded-lg border border-red-200 break-words">
            {error.message}
          </p>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
            다시 시도
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-700 font-semibold rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            <Home className="w-5 h-5" />
            홈으로 이동
          </Link>
        </div>

        {/* Help Text */}
        <p className="text-sm text-gray-500 mt-8">
          문제가 계속되면{' '}
          <a
            href="mailto:info@dfp.or.kr"
            className="text-blue-600 hover:underline"
          >
            고객센터
          </a>
          로 문의해주세요.
        </p>
      </div>
    </div>
  )
}
