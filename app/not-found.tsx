'use client'

import Link from 'next/link'
import { FileQuestion, Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-md w-full text-center">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="rounded-full bg-blue-100 p-6">
            <FileQuestion className="w-16 h-16 text-blue-600" />
          </div>
        </div>

        {/* 404 */}
        <div className="mb-4">
          <h2 className="text-8xl font-bold text-gray-300">404</h2>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          페이지를 찾을 수 없습니다
        </h1>

        {/* Description */}
        <p className="text-gray-600 mb-8">
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
          <br />
          URL을 다시 확인해주세요.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-700 font-semibold rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            이전 페이지
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Home className="w-5 h-5" />
            홈으로 이동
          </Link>
        </div>

        {/* Quick Links */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-4">자주 찾는 페이지</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/services"
              className="text-sm text-blue-600 hover:underline"
            >
              서비스 안내
            </Link>
            <span className="text-gray-300">|</span>
            <Link
              href="/stories"
              className="text-sm text-blue-600 hover:underline"
            >
              가족 이야기
            </Link>
            <span className="text-gray-300">|</span>
            <Link
              href="/support"
              className="text-sm text-blue-600 hover:underline"
            >
              후원하기
            </Link>
            <span className="text-gray-300">|</span>
            <Link
              href="/about"
              className="text-sm text-blue-600 hover:underline"
            >
              조직 소개
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
