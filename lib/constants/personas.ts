import { Users, Building2, Heart } from 'lucide-react'
import type { PersonaCard } from '@/lib/types/persona'

/**
 * DFP Connect 3가지 페르소나 정의
 *
 * 1. 서비스 이용자 (장애인 가족) - B2C
 * 2. 기업/기관 파트너 - B2B
 * 3. 후원 파트너 - Supporter
 */
export const personas: PersonaCard[] = [
  {
    id: 'family',
    title: '서비스 이용자',
    description: '장애인 가족을 위한 맞춤형 돌봄 및 지원 서비스',
    icon: Users,
    benefits: [
      '24시간 긴급돌봄 서비스',
      '방과후 홈티 교육 프로그램',
      '개별/가족 상담 지원',
      '맞춤형 여행 및 문화 활동',
    ],
    ctaText: '서비스 신청하기',
    ctaLink: '/services',
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600',
    buttonColor: 'bg-blue-600 hover:bg-blue-700',
  },
  {
    id: 'b2b',
    title: '기업/기관 파트너',
    description: '전문 인력 파견 및 장애 인식 개선 프로그램',
    icon: Building2,
    benefits: [
      '전문 돌봄 인력 파견',
      '장애 인식 개선 워크숍',
      '기관 맞춤형 교육 프로그램',
      '장기 협력 파트너십 구축',
    ],
    ctaText: '협력 문의하기',
    ctaLink: '/b2b',
    bgColor: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    buttonColor: 'bg-emerald-600 hover:bg-emerald-700',
  },
  {
    id: 'supporter',
    title: '후원 파트너',
    description: '투명한 기부와 지속 가능한 사회적 임팩트 창출',
    icon: Heart,
    benefits: [
      '연간 500가구 지원 임팩트',
      '45개 파트너십 네트워크',
      '투명한 재정 운영 보고',
      '세액공제 및 후원 인증서',
    ],
    ctaText: '후원하기',
    ctaLink: '/support',
    bgColor: 'bg-rose-50',
    iconColor: 'text-rose-600',
    buttonColor: 'bg-rose-600 hover:bg-rose-700',
  },
]
