import type { Metadata } from 'next'
import { HeroSection } from '@/components/public/hero-section'
import { MissionSection } from '@/components/public/mission-section'
import { PersonaCards } from '@/components/public/persona-cards'

export const metadata: Metadata = {
  title: 'DFP Connect - 장애와가족플랫폼 | 장애인 가족과 함께하는 희망의 디지털 허브',
  description:
    '장애인 가족을 위한 긴급돌봄, 방과후 홈티, 가족 상담, 맞춤형 여행 서비스를 제공합니다. 전문 인력 파견과 사회적 협력을 통해 장애인 가족의 삶의 질을 향상시킵니다.',
  keywords:
    '장애인가족, 긴급돌봄, 방과후홈티, 가족상담, 맞춤형여행, 장애인지원, 사회적협동조합, 전문인력파견',
  openGraph: {
    title: 'DFP Connect - 장애와가족플랫폼',
    description: '장애인 가족과 함께하는 희망의 디지털 허브',
    type: 'website',
    locale: 'ko_KR',
    url: 'https://dfp.or.kr',
    siteName: 'DFP Connect',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DFP Connect - 장애와가족플랫폼',
    description: '장애인 가족과 함께하는 희망의 디지털 허브',
  },
}

/**
 * 메인 랜딩 페이지
 *
 * Hero + Mission + PersonaCards 섹션으로 구성
 */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MissionSection />
      <PersonaCards />
    </>
  )
}
