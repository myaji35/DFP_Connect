/**
 * 서비스 타입 정의
 */

import { LucideIcon } from 'lucide-react'

/**
 * 서비스 카테고리
 */
export enum ServiceCategory {
  EMERGENCY = 'EMERGENCY',
  EDUCATION = 'EDUCATION',
  COUNSELING = 'COUNSELING',
  TRAVEL = 'TRAVEL',
  B2B = 'B2B',
}

/**
 * 서비스 정보
 */
export interface Service {
  /**
   * 서비스 ID
   */
  id: string

  /**
   * 서비스 이름
   */
  name: string

  /**
   * 카테고리
   */
  category: ServiceCategory

  /**
   * 짧은 설명
   */
  description: string

  /**
   * 상세 설명
   */
  detailedDescription: string

  /**
   * 아이콘
   */
  icon: LucideIcon

  /**
   * 주요 특징
   */
  features: string[]

  /**
   * 신청 방법
   */
  howToApply: string[]

  /**
   * 대상
   */
  target: string

  /**
   * 비용
   */
  cost: string

  /**
   * 소요 시간
   */
  duration?: string

  /**
   * 신청 링크
   */
  applyLink?: string

  /**
   * 배경 색상
   */
  bgColor: string

  /**
   * 아이콘 색상
   */
  iconColor: string

  /**
   * 배지
   */
  badge?: string
}
