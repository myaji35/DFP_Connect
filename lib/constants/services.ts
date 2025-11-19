import { Phone, BookOpen, MessageCircle, Plane, Users } from 'lucide-react'
import { Service, ServiceCategory } from '@/lib/types/service'

/**
 * 전체 서비스 목록
 */
export const services: Service[] = [
  {
    id: 'emergency-care',
    name: '긴급돌봄',
    category: ServiceCategory.EMERGENCY,
    description: '보호자의 갑작스러운 입원이나 긴급 상황 시 즉시 돌봄 제공',
    detailedDescription:
      '가족 구성원의 갑작스러운 입원, 사고 등 긴급 상황이 발생했을 때 장애인 가족 구성원을 안전하게 돌보는 서비스입니다. 24시간 365일 긴급 연락이 가능하며, 최대한 빠르게 전문 돌봄 인력을 파견합니다.',
    icon: Phone,
    features: [
      '24시간 365일 긴급 연락 가능',
      '최대 2시간 이내 돌봄 인력 파견',
      '전문 사회복지사 배치',
      '상황별 맞춤 돌봄 제공',
      '최우선 처리 시스템',
    ],
    howToApply: [
      '긴급 상황 발생 시 즉시 전화 (1234-5678)',
      '웹사이트 긴급돌봄 폼 작성',
      '상황 설명 및 연락처 제공',
      '담당자가 즉시 연락 및 파견 조치',
    ],
    target: '돌봄이 필요한 장애인 가족',
    cost: '소득 수준별 차등 지원 (최대 무료)',
    duration: '상황 종료 시까지',
    applyLink: '/services#emergency-form',
    bgColor: 'bg-red-50',
    iconColor: 'text-red-600',
    badge: '긴급',
  },
  {
    id: 'after-school',
    name: '방과후 홈티',
    category: ServiceCategory.EDUCATION,
    description: '아동의 사회성 발달과 맞춤형 교육을 위한 가정방문 서비스',
    detailedDescription:
      '장애 아동의 개별 특성과 필요에 맞춘 1:1 교육 프로그램을 가정에서 제공합니다. 언어치료, 행동치료, 학습지도 등 다양한 영역을 전문가가 직접 방문하여 지도합니다.',
    icon: BookOpen,
    features: [
      '1:1 전문가 매칭',
      '개별 맞춤형 교육 프로그램',
      '주 2-3회 정기 방문',
      '언어치료, 행동치료, 학습지도',
      '진행 상황 정기 보고',
    ],
    howToApply: [
      '상담 신청서 작성',
      '아동 특성 및 필요 파악 상담',
      '적합한 전문가 매칭',
      '교육 계획 수립',
      '정기 방문 시작',
    ],
    target: '만 7-18세 장애 아동',
    cost: '월 20-40만원 (바우처 사용 가능)',
    duration: '주 2-3회, 회당 1-2시간',
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600',
    badge: '교육',
  },
  {
    id: 'family-counseling',
    name: '개별/가족 상담',
    category: ServiceCategory.COUNSELING,
    description: '우울증, 스트레스 등 정서적 어려움에 대한 전문 상담',
    detailedDescription:
      '장애인 가족 구성원이 겪는 심리적 어려움, 가족 간 갈등, 스트레스 관리 등을 전문 상담사가 지원합니다. 개별 상담과 가족 상담 모두 제공하며, 온라인/오프라인 선택 가능합니다.',
    icon: MessageCircle,
    features: [
      '전문 상담사 배치 (임상심리사, 가족상담사)',
      '개별/가족/집단 상담 선택',
      '온라인/오프라인 상담 가능',
      '비밀 보장',
      '장기 심리 지원 프로그램',
    ],
    howToApply: [
      '상담 신청서 작성',
      '초기 상담 (상담사 매칭)',
      '상담 일정 조율',
      '정기 상담 진행',
      '필요시 추가 서비스 연계',
    ],
    target: '장애인 및 가족 구성원',
    cost: '회당 3-5만원 (소득별 할인)',
    duration: '회당 50분, 주 1회 권장',
    bgColor: 'bg-green-50',
    iconColor: 'text-green-600',
    badge: '상담',
  },
  {
    id: 'customized-travel',
    name: '맞춤형 여행',
    category: ServiceCategory.TRAVEL,
    description: '장애인 가족을 위한 특별한 여행 설계 및 동행 서비스',
    detailedDescription:
      '장애인 가족이 안전하고 즐겁게 여행할 수 있도록 전체 일정을 맞춤 설계하고 전문 인력이 동행합니다. 접근성 있는 숙소, 이동 수단, 관광지를 사전 점검하여 완벽한 여행을 제공합니다.',
    icon: Plane,
    features: [
      '가족 맞춤형 여행 설계',
      '전문 동행 인력 배치',
      '접근성 있는 숙소 및 이동 수단',
      '긴급 상황 대비 시스템',
      '추억 사진 촬영 서비스',
    ],
    howToApply: [
      '여행 상담 신청',
      '가족 구성 및 필요 사항 파악',
      '맞춤 여행 일정 설계',
      '견적 확인 및 일정 확정',
      '여행 진행',
    ],
    target: '장애인 포함 가족 단위',
    cost: '1박 2일 기준 1인당 15-25만원',
    duration: '1박 2일 ~ 2박 3일',
    bgColor: 'bg-purple-50',
    iconColor: 'text-purple-600',
    badge: '여행',
  },
  {
    id: 'professional-staffing',
    name: '전문인력 파견',
    category: ServiceCategory.B2B,
    description: '복지기관, 센터, 학교를 위한 전문 강사 및 인력 파견',
    detailedDescription:
      '복지관, 장애인센터, 학교 등 기관에서 필요한 전문 인력을 파견합니다. 사회복지사, 특수교사, 언어치료사, 작업치료사 등 다양한 전문가를 보유하고 있으며, 장애 인식 개선 교육, 부모 교육 등도 제공합니다.',
    icon: Users,
    features: [
      '검증된 전문 인력 풀',
      '단기/장기 파견 가능',
      '장애 인식 개선 워크숍',
      '부모 교육 프로그램',
      '맞춤형 교육 기획',
    ],
    howToApply: [
      'B2B 문의 접수',
      '기관 필요 사항 파악',
      '적합한 인력 매칭',
      '계약 체결',
      '인력 파견 시작',
    ],
    target: '복지기관, 센터, 학교, 기업',
    cost: '협의 (규모 및 기간에 따라 상이)',
    duration: '협의',
    applyLink: '/b2b',
    bgColor: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
    badge: 'B2B',
  },
]

/**
 * 카테고리별 서비스
 */
export const servicesByCategory = {
  [ServiceCategory.EMERGENCY]: services.filter(
    (s) => s.category === ServiceCategory.EMERGENCY
  ),
  [ServiceCategory.EDUCATION]: services.filter(
    (s) => s.category === ServiceCategory.EDUCATION
  ),
  [ServiceCategory.COUNSELING]: services.filter(
    (s) => s.category === ServiceCategory.COUNSELING
  ),
  [ServiceCategory.TRAVEL]: services.filter(
    (s) => s.category === ServiceCategory.TRAVEL
  ),
  [ServiceCategory.B2B]: services.filter((s) => s.category === ServiceCategory.B2B),
}

/**
 * 카테고리 레이블
 */
export const categoryLabels = {
  [ServiceCategory.EMERGENCY]: '긴급돌봄',
  [ServiceCategory.EDUCATION]: '교육',
  [ServiceCategory.COUNSELING]: '상담',
  [ServiceCategory.TRAVEL]: '여행',
  [ServiceCategory.B2B]: 'B2B',
}
