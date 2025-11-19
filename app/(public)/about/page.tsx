import type { Metadata } from 'next'
import { VisionMissionSection } from '@/components/public/vision-mission'
import { Timeline } from '@/components/public/timeline'
import { TeamGrid } from '@/components/public/team-grid'
import { ImpactStats } from '@/components/public/impact-stats'
import { Building2 } from 'lucide-react'

export const metadata: Metadata = {
  title: '조직 소개 - DFP Connect',
  description:
    '장애와가족플랫폼 사회적협동조합의 비전, 미션, 연혁, 팀 구성원을 소개합니다. 2018년부터 500가구 지원, 45개 파트너십을 통해 사회적 가치를 창출하고 있습니다.',
  keywords:
    '장애와가족플랫폼, 사회적협동조합, 조직소개, 연혁, 팀소개, 사회적가치',
}

/**
 * 조직 소개 페이지
 *
 * Vision/Mission + Timeline + Team + Impact Stats
 */
export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm mb-6">
            <Building2 className="w-10 h-10" />
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            장애와가족플랫폼
            <br />
            사회적협동조합
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
            2018년부터 함께해온 장애인 가족과의 동행
            <br className="hidden md:block" />
            사회적 돌봄체계 구축을 위한 여정
          </p>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-12">
            <div>
              <div className="text-3xl md:text-4xl font-bold">6년</div>
              <div className="text-blue-200 text-sm">함께한 시간</div>
            </div>
            <div className="hidden sm:block w-px bg-white/30" />
            <div>
              <div className="text-3xl md:text-4xl font-bold">500+</div>
              <div className="text-blue-200 text-sm">지원 가구</div>
            </div>
            <div className="hidden sm:block w-px bg-white/30" />
            <div>
              <div className="text-3xl md:text-4xl font-bold">45+</div>
              <div className="text-blue-200 text-sm">협력 파트너</div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="bg-white">
        <VisionMissionSection />
      </section>

      {/* Impact Stats Section */}
      <section>
        <ImpactStats />
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-4 bg-white">
        <Timeline />
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 bg-gray-50">
        <TeamGrid />
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            함께 성장하는 파트너를 찾습니다
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            후원, 자원봉사, 파트너십 등 다양한 방식으로 참여하실 수 있습니다
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/support"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition-colors shadow-xl"
            >
              후원하기
            </a>
            <a
              href="/b2b"
              className="inline-block bg-blue-700 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-800 transition-colors border-2 border-white"
            >
              파트너십 문의
            </a>
            <a
              href="/services"
              className="inline-block bg-transparent text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-colors border-2 border-white"
            >
              서비스 신청
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
