/**
 * 팀 멤버 타입 정의
 */

export interface TeamMember {
  /**
   * 멤버 ID
   */
  id: string

  /**
   * 이름
   */
  name: string

  /**
   * 직책
   */
  position: string

  /**
   * 부서/팀
   */
  department?: string

  /**
   * 프로필 이미지 URL
   */
  image?: string

  /**
   * 간단한 소개
   */
  bio: string

  /**
   * 전문 분야
   */
  expertise: string[]

  /**
   * 이메일
   */
  email?: string

  /**
   * LinkedIn 프로필
   */
  linkedin?: string

  /**
   * 순서 (표시 우선순위)
   */
  order: number
}

export type TeamCategory = 'leadership' | 'management' | 'specialist'
