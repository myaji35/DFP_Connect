import type { Metadata } from 'next'
import { Heart, GraduationCap, MessageCircle, Plane, Users, FileCheck, Phone, Mail } from 'lucide-react'
import { HeroSection } from '@/components/hero/HeroSection'
import { EmergencyHighlightBox } from '@/components/cards/EmergencyHighlightBox'
import { ServiceCard } from '@/components/cards/ServiceCard'
import { ProcessFlow } from '@/components/interactive/ProcessFlow'
import { FAQAccordion } from '@/components/interactive/FAQAccordion'
import { Section } from '@/components/layout/Section'
import { Container } from '@/components/layout/Container'

export const metadata: Metadata = {
  title: '서비스 안내 | DFP Connect',
  description:
    '24시간 긴급돌봄, 방과후 홈티, 전문 상담, 맞춤형 여행 등 장애인 가족의 일상을 지원하는 맞춤형 서비스. 경험 많은 전문가와 함께합니다.',
  keywords: '긴급돌봄, 24시간돌봄, 방과후홈티, 가족상담, 맞춤형여행, 장애인서비스, B2B전문인력, 특수교육',
  openGraph: {
    title: '서비스 안내 | DFP Connect',
    description: '장애인 가족을 위한 맞춤형 서비스 - 긴급돌봄부터 교육, 상담까지',
    type: 'website',
    locale: 'ko_KR',
    siteName: 'DFP Connect',
  },
  twitter: {
    card: 'summary_large_image',
    title: '서비스 안내 | DFP Connect',
    description: '장애인 가족을 위한 맞춤형 서비스',
  },
}

/**
 * 서비스 페이지
 *
 * Hero + Emergency Highlight + Service Cards + Process Flow + FAQ
 */
export default function ServicesPage() {
  const services = [
    {
      title: '긴급돌봄',
      description: '보호자의 갑작스러운 입원이나 긴급 상황 시 24시간 언제든지 돌봄 서비스를 제공합니다.',
      icon: Heart,
      features: [
        '24시간 365일 긴급 대응',
        '경험 많은 전문 돌봄 인력',
        '최대 7일간 연속 지원 가능',
        '1:1 맞춤형 케어',
      ],
      link: '/services#emergency',
      badge: '긴급',
      badgeVariant: 'emergency' as const,
    },
    {
      title: '방과후 홈티',
      description: '장애 아동의 학습과 성장을 위한 전문 교사의 1:1 홈스쿨 서비스를 제공합니다.',
      icon: GraduationCap,
      features: [
        '개별 맞춤 교육 프로그램',
        '특수교육 자격 교사 파견',
        '주 1~5회 선택 가능',
        '학습 발달 정기 보고',
      ],
      link: '/services#tutoring',
      badge: '인기',
      badgeVariant: 'success' as const,
    },
    {
      title: '개별/가족 상담',
      description: '장애 아동과 가족의 심리적 안정과 관계 개선을 위한 전문 상담 서비스를 제공합니다.',
      icon: MessageCircle,
      features: [
        '임상심리 전문가 상담',
        '개별 상담 및 가족 상담',
        '온라인/오프라인 선택 가능',
        '장기 상담 프로그램 운영',
      ],
      link: '/services#counseling',
    },
    {
      title: '맞춤형 여행',
      description: '장애인 가족이 함께 즐길 수 있는 배리어프리 여행 프로그램을 기획하고 지원합니다.',
      icon: Plane,
      features: [
        '접근성 높은 여행지 선정',
        '전문 동행 인력 지원',
        '맞춤형 일정 기획',
        '안전한 이동 수단 제공',
      ],
      link: '/services#travel',
    },
    {
      title: '전문인력 파견 (B2B)',
      description: '학교, 센터, 기관을 위한 특수교사, 상담사, 돌봄 인력 파견 서비스를 제공합니다.',
      icon: Users,
      features: [
        '자격증 보유 전문 인력',
        '기관 맞춤형 교육 프로그램',
        '정기/비정기 파견 가능',
        '행정 지원 및 관리',
      ],
      link: '/partners',
      badge: 'B2B',
      badgeVariant: 'warning' as const,
    },
  ]

  const processSteps = [
    {
      number: 1,
      title: '신청 및 상담',
      description: '전화, 온라인, 방문을 통해 서비스를 신청하고 상담 일정을 잡습니다.',
      icon: Phone,
    },
    {
      number: 2,
      title: '욕구 파악',
      description: '전문 상담원이 가족의 상황과 필요를 자세히 파악합니다.',
      icon: MessageCircle,
    },
    {
      number: 3,
      title: '서비스 매칭',
      description: '욕구에 맞는 최적의 서비스와 전문 인력을 매칭합니다.',
      icon: Users,
    },
    {
      number: 4,
      title: '서비스 제공',
      description: '계획에 따라 전문적이고 따뜻한 서비스를 제공합니다.',
      icon: Heart,
    },
  ]

  const faqs = [
    {
      question: '긴급돌봄은 얼마나 빨리 이용할 수 있나요?',
      answer: '긴급돌봄은 24시간 365일 운영되며, 요청 후 2-4시간 이내에 돌봄 인력을 파견할 수 있습니다. 상황에 따라 더 빠른 대응이 가능한 경우도 있으니 전화로 문의해주세요.',
    },
    {
      question: '서비스 이용 비용은 어떻게 되나요?',
      answer: '서비스 종류와 이용 시간에 따라 비용이 다릅니다. 긴급돌봄은 시간당 15,000원, 방과후 홈티는 회당 50,000원부터 시작합니다. 정확한 비용은 상담 시 안내해드립니다.',
    },
    {
      question: '서비스 제공 지역은 어디까지인가요?',
      answer: '현재 서울, 경기 지역을 중심으로 서비스를 제공하고 있으며, 긴급돌봄의 경우 전국 어디서나 이용 가능합니다. 원거리 지역은 교통비가 추가될 수 있습니다.',
    },
    {
      question: '파견되는 인력의 자격은 어떻게 되나요?',
      answer: '모든 파견 인력은 특수교육, 사회복지, 간호 등 관련 자격증을 보유하고 있으며, DFP의 엄격한 교육과 검증 과정을 거친 전문가들입니다.',
    },
    {
      question: '서비스 신청은 어떻게 하나요?',
      answer: '전화(02-1234-5678), 온라인 문의, 또는 직접 방문을 통해 신청하실 수 있습니다. 긴급돌봄은 전화로만 신청 가능하며, 다른 서비스는 온라인으로도 신청 가능합니다.',
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <HeroSection
        subtitle="장애인 가족을 위한"
        title="전문 서비스 안내"
        description="긴급돌봄부터 교육, 상담, 여행까지 장애인 가족의 삶의 질 향상을 위한 전문적이고 따뜻한 서비스를 제공합니다."
        ctaText="긴급돌봄 신청"
        ctaLink="#emergency"
        secondaryCtaText="전화 상담"
        secondaryCtaLink="tel:02-1234-5678"
        variant="gradient-blue"
      />

      {/* Emergency Highlight */}
      <Section spacing="xl" background="white">
        <Container>
          <EmergencyHighlightBox />
        </Container>
      </Section>

      {/* Services Grid */}
      <Section spacing="xl" background="gray">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              전체 서비스
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              가족의 필요에 맞는 서비스를 선택하세요
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </Container>
      </Section>

      {/* Process Flow */}
      <Section spacing="xl" background="white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              서비스 이용 절차
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              간단한 4단계로 서비스를 이용하실 수 있습니다
            </p>
          </div>

          <ProcessFlow steps={processSteps} variant="horizontal" />
        </Container>
      </Section>

      {/* FAQ */}
      <Section spacing="xl" background="gray">
        <Container size="narrow">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              자주 묻는 질문
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              서비스 이용에 대해 궁금한 점을 확인하세요
            </p>
          </div>

          <FAQAccordion faqs={faqs} defaultOpen={0} />
        </Container>
      </Section>

      {/* CTA Section */}
      <Section spacing="xl" background="gradient-blue">
        <Container size="narrow">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 md:p-12 text-center">
            <FileCheck className="w-16 h-16 text-primary-500 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              서비스 신청하기
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              전문 상담원이 친절하게 안내해드립니다
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:02-1234-5678"
                className="inline-flex items-center justify-center h-12 px-8 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 transition-colors shadow-lg hover:shadow-xl gap-2"
              >
                <Phone className="w-5 h-5" />
                전화 상담
              </a>
              <a
                href="mailto:info@dfp.or.kr"
                className="inline-flex items-center justify-center h-12 px-8 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-50 transition-colors border-2 border-gray-300 gap-2"
              >
                <Mail className="w-5 h-5" />
                이메일 문의
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
