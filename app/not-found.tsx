'use client'

import Link from 'next/link'
import { Home, ArrowLeft, Search, Heart } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4">
      <div className="text-center max-w-2xl">
        {/* 404 아이콘 */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-primary-100 dark:bg-primary-900/30 mb-6 animate-pulse">
            <span className="text-6xl">🔍</span>
          </div>
        </div>

        {/* 에러 코드 */}
        <h1 className="text-8xl md:text-9xl font-bold text-primary-500 dark:text-primary-400 mb-4 animate-fade-in">
          404
        </h1>

        {/* 메시지 */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
          페이지를 찾을 수 없습니다
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
          <br className="hidden md:block" />
          아래 링크를 통해 원하시는 페이지로 이동해보세요.
        </p>

        {/* CTA 버튼들 */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Home className="w-5 h-5" />
            <span>홈으로 돌아가기</span>
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>이전 페이지로</span>
          </button>
        </div>

        {/* 빠른 링크 */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            자주 찾는 페이지
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/services"
              className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-500 hover:shadow-md transition-all group"
            >
              <Heart className="w-6 h-6 text-primary-500 mb-2 mx-auto" />
              <p className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors">
                서비스 안내
              </p>
            </Link>

            <Link
              href="/stories"
              className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-500 hover:shadow-md transition-all group"
            >
              <Search className="w-6 h-6 text-primary-500 mb-2 mx-auto" />
              <p className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors">
                가족 이야기
              </p>
            </Link>

            <Link
              href="/partners"
              className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-500 hover:shadow-md transition-all group"
            >
              <div className="w-6 h-6 text-primary-500 mb-2 mx-auto text-2xl">🤝</div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors">
                B2B 협력
              </p>
            </Link>

            <Link
              href="/support"
              className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-500 hover:shadow-md transition-all group"
            >
              <div className="w-6 h-6 text-primary-500 mb-2 mx-auto text-2xl">💝</div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors">
                후원하기
              </p>
            </Link>
          </div>
        </div>

        {/* 문의 안내 */}
        <div className="mt-12 text-sm text-gray-500 dark:text-gray-400">
          <p>
            문제가 계속되면{' '}
            <a
              href="mailto:support@dfp.or.kr"
              className="text-primary-600 dark:text-primary-400 font-semibold hover:underline"
            >
              support@dfp.or.kr
            </a>
            로 문의해주세요.
          </p>
        </div>
      </div>
    </div>
  )
}
