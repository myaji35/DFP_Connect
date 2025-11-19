/**
 * 페르소나 타입 정의
 *
 * DFP Connect의 3가지 주요 페르소나 (서비스 이용자, 기업/기관, 후원 파트너)
 */

import { LucideIcon } from 'lucide-react'

/**
 * 페르소나 카드 데이터
 */
export interface PersonaCard {
  /**
   * 페르소나 ID
   */
  id: string

  /**
   * 페르소나 제목
   */
  title: string

  /**
   * 페르소나 설명
   */
  description: string

  /**
   * 아이콘 (Lucide Icon)
   */
  icon: LucideIcon

  /**
   * 주요 서비스/혜택 목록
   */
  benefits: string[]

  /**
   * CTA 버튼 텍스트
   */
  ctaText: string

  /**
   * CTA 버튼 링크
   */
  ctaLink: string

  /**
   * 배경 색상 (Tailwind 클래스)
   */
  bgColor: string

  /**
   * 아이콘 색상 (Tailwind 클래스)
   */
  iconColor: string

  /**
   * 버튼 색상 (Tailwind 클래스)
   */
  buttonColor: string
}

/**
 * 페르소나 타입 (3가지)
 */
export type PersonaType = 'family' | 'b2b' | 'supporter'
