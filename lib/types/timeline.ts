/**
 * 연혁 타임라인 타입 정의
 */

export interface TimelineEvent {
  /**
   * 연도
   */
  year: string

  /**
   * 월 (선택사항)
   */
  month?: string

  /**
   * 이벤트 제목
   */
  title: string

  /**
   * 이벤트 상세 설명
   */
  description: string

  /**
   * 주요 마일스톤 여부
   */
  isMajor?: boolean

  /**
   * 이벤트 카테고리
   */
  category?: 'founding' | 'partnership' | 'service' | 'achievement' | 'expansion'
}
