import type { Metadata } from 'next'
import { Users, GraduationCap, Heart, MessageCircle, Sparkles, CheckCircle, ArrowRight, Target, Clock, Shield } from 'lucide-react'
import { HeroSection } from '@/components/hero/HeroSection'
import { ServiceCard } from '@/components/cards/ServiceCard'
import { TestimonialCard } from '@/components/cards/TestimonialCard'
import { B2BContactForm } from '@/components/forms/B2BContactForm'
import { Section } from '@/components/layout/Section'
import { Container } from '@/components/layout/Container'

export const metadata: Metadata = {
  title: 'B2B 협력 파트너 | DFP Connect',
  description:
    '학교, 센터, 복지기관을 위한 전문인력 파견 서비스. 특수교사, 상담사, 돌봄 전문가를 통해 장애인 가족 지원 서비스를 확장하세요.',
  keywords: '전문인력파견, B2B협력, 특수교사, 상담사파견, 돌봄인력, 복지기관협력, 장애인서비스',
  openGraph: {
    title: 'B2B 협력 파트너 | DFP Connect',
    description: '전문인력 파견으로 더 나은 서비스를 제공하세요',
    type: 'website',
  },
}

/**
 * B2B 협력 파트너 페이지
 *
 * 학교, 센터, 복지기관 등 B2B 고객을 위한 전문인력 파견 및 협력 안내 페이지
 */
export default function PartnersPage() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection
        subtitle="전문성과 신뢰를 함께하는"
        title="B2B 협력 파트너십"
        description="DFP와 함께 장애인 가족을 위한 더 나은 서비스를 제공하세요. 검증된 전문인력 파견과 맞춤형 솔루션으로 귀 기관의 서비스를 지원합니다."
        ctaText="협력 문의하기"
        ctaLink="#contact"
        secondaryCtaText="서비스 보기"
        secondaryCtaLink="#services"
        variant="gradient-green"
      />

      {/* 전문인력 파견 서비스 */}
      <Section spacing="xl" background="white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              전문인력 파견 서비스
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              귀 기관의 니즈에 맞는 검증된 전문가를 파견합니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ServiceCard
              title="전문 교사 파견"
              description="특수교육 자격을 갖춘 교사 파견으로 장애 학생 교육을 지원합니다."
              icon={GraduationCap}
              link="#contact"
              linkText="문의하기"
              badge="인기"
            />
            <ServiceCard
              title="상담사 파견"
              description="심리상담, 가족상담 전문가를 통해 맞춤형 상담 서비스를 제공합니다."
              icon={MessageCircle}
              link="#contact"
              linkText="문의하기"
            />
            <ServiceCard
              title="돌봄 인력 파견"
              description="경험 많은 돌봄 전문가로 안전하고 따뜻한 케어를 제공합니다."
              icon={Heart}
              link="#contact"
              linkText="문의하기"
            />
            <ServiceCard
              title="특수 강사 파견"
              description="예체능, 치료, 직업 훈련 등 다양한 분야의 전문 강사를 파견합니다."
              icon={Sparkles}
              link="#contact"
              linkText="문의하기"
            />
          </div>
        </Container>
      </Section>

      {/* 협력 혜택 */}
      <Section spacing="xl" background="gray">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              DFP와 협력하면 좋은 점
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              검증된 전문성과 신뢰로 귀 기관의 서비스 품질을 높여드립니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* 전문성 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border-t-4 border-primary-500">
              <div className="w-14 h-14 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-8 h-8 text-primary-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                검증된 전문성
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>자격증 및 경력 철저히 검증</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>정기적인 교육 및 슈퍼비전</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>장애인 가족 지원 경험 풍부</span>
                </li>
              </ul>
            </div>

            {/* 신속성 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border-t-4 border-success">
              <div className="w-14 h-14 bg-success-light/20 rounded-lg flex items-center justify-center mb-4">
                <Clock className="w-8 h-8 text-success" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                빠른 매칭
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>평균 3일 이내 인력 매칭</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>긴급 상황 우선 대응</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>대체 인력 신속 지원</span>
                </li>
              </ul>
            </div>

            {/* 신뢰성 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border-t-4 border-warning">
              <div className="w-14 h-14 bg-warning-light/20 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-warning" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                믿을 수 있는 관리
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>전담 매니저 배정</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>정기 모니터링 및 피드백</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>보험 및 안전 관리 완비</span>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* 협력 기관 후기 */}
      <Section spacing="xl" background="white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              협력 기관의 목소리
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              DFP와 함께하는 파트너들의 생생한 경험을 들어보세요
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <TestimonialCard
              quote="DFP의 전문 상담사를 통해 우리 센터 이용자들에게 더 질 높은 서비스를 제공할 수 있게 되었습니다. 신속한 매칭과 철저한 관리에 감사드립니다."
              author="김민지"
              role="센터장"
              organization="서울시 장애인복지관"
            />
            <TestimonialCard
              quote="특수교사 파견 서비스 덕분에 학생들이 개별화된 교육을 받을 수 있게 되었어요. 파견된 선생님들의 전문성이 뛰어나고 학생들과의 관계도 좋습니다."
              author="이현수"
              role="교감"
              organization="○○초등학교"
            />
            <TestimonialCard
              quote="긴급하게 돌봄 인력이 필요했는데, 3일 만에 경험 많은 선생님을 매칭해주셨어요. 덕분에 프로그램을 차질 없이 진행할 수 있었습니다."
              author="박서연"
              role="팀장"
              organization="경기도 장애인가족지원센터"
            />
          </div>
        </Container>
      </Section>

      {/* 협력 프로세스 */}
      <Section spacing="xl" background="gradient-blue">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              협력 프로세스
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              간단한 4단계로 전문인력 파견이 완료됩니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: 1, title: '문의 접수', desc: '필요한 서비스와 요구사항을 알려주세요' },
              { step: 2, title: '상담 및 매칭', desc: '전담 매니저가 최적의 인력을 매칭합니다' },
              { step: 3, title: '계약 및 파견', desc: '계약 체결 후 인력을 파견합니다' },
              { step: 4, title: '지속 관리', desc: '정기 모니터링으로 품질을 관리합니다' },
            ].map((item, idx) => (
              <div key={idx} className="relative">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center h-full">
                  <div className="w-12 h-12 bg-primary-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {item.desc}
                  </p>
                </div>
                {idx < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 -translate-y-1/2 z-10">
                    <ArrowRight className="w-6 h-6 text-primary-500" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 협력 문의 폼 */}
      <Section spacing="xl" background="white" id="contact">
        <Container size="narrow">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              협력 문의하기
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              DFP와 함께 더 나은 서비스를 만들어가세요
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-10 border border-gray-100 dark:border-gray-700">
            <B2BContactForm />
          </div>

          <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
            <p>
              문의사항이 있으신가요?{' '}
              <a
                href="tel:02-1234-5678"
                className="text-primary-600 dark:text-primary-400 font-semibold hover:underline"
              >
                02-1234-5678
              </a>{' '}
              또는{' '}
              <a
                href="mailto:partners@dfp.or.kr"
                className="text-primary-600 dark:text-primary-400 font-semibold hover:underline"
              >
                partners@dfp.or.kr
              </a>
              로 연락주세요.
            </p>
          </div>
        </Container>
      </Section>
    </>
  )
}
