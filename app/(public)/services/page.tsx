import type { Metadata } from 'next'
import { EmergencyForm } from '@/components/public/emergency-form'
import { ServiceGrid } from '@/components/public/service-grid'
import { Heart } from 'lucide-react'

export const metadata: Metadata = {
  title: '서비스 안내 - DFP Connect',
  description:
    '긴급돌봄, 방과후 홈티, 가족 상담, 맞춤형 여행 등 장애인 가족을 위한 전문 서비스를 제공합니다.',
  keywords: '긴급돌봄, 방과후홈티, 가족상담, 맞춤형여행, 장애인서비스, B2B전문인력',
}

/**
 * 서비스 페이지
 *
 * 긴급돌봄 요청 폼과 전체 서비스 탐색
 */
export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 via-white to-gray-50">
      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-red-600 to-rose-700 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            서비스 안내
          </h1>
          <p className="text-lg md:text-xl text-red-100 max-w-3xl mx-auto">
            장애인 가족의 삶의 질 향상을 위한
            <br className="hidden md:block" />
            전문적이고 따뜻한 서비스를 제공합니다
          </p>
        </div>
      </section>

      {/* Emergency Form Section */}
      <section id="emergency-form" className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              최우선 처리
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              긴급돌봄 요청
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              보호자의 갑작스러운 입원이나 긴급 상황 시
              <br className="hidden md:block" />
              24시간 언제든지 도움을 요청하세요
            </p>
          </div>

          <EmergencyForm />

          {/* Contact Info */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 mb-2">
              급하신 경우 전화로 직접 연락하실 수 있습니다
            </p>
            <a
              href="tel:1234-5678"
              className="inline-flex items-center gap-2 text-lg font-bold text-red-600 hover:text-red-700 transition-colors"
            >
              <Heart className="w-5 h-5" />
              긴급 연락처: 1234-5678
            </a>
          </div>
        </div>
      </section>

      {/* All Services Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              전체 서비스
            </h2>
            <p className="text-lg text-gray-600">
              카테고리별로 필요한 서비스를 찾아보세요
            </p>
          </div>

          <ServiceGrid />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center text-white shadow-2xl">
          <h2 className="text-3xl font-bold mb-4">
            서비스 문의가 필요하신가요?
          </h2>
          <p className="text-lg text-blue-100 mb-8">
            전문 상담원이 친절하게 안내해드립니다
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:1234-5678"
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors"
            >
              전화 문의하기
            </a>
            <a
              href="/support"
              className="inline-block bg-blue-700 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-800 transition-colors border-2 border-white"
            >
              후원하기
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
