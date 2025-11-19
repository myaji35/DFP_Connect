// 공통 타입 정의

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

// API 응답 타입
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: {
    code: string
    message: string
    details?: Array<{
      field?: string
      message: string
    }>
  }
  message?: string
}

// 페이지네이션 타입
export interface Pagination {
  page: number
  limit: number
  total: number
  totalPages: number
}

// 정렬 타입
export type SortOrder = 'asc' | 'desc'

export interface SortOption {
  field: string
  order: SortOrder
}

// Prisma Enum 타입들 (DB와 동기화)
export type FormType = 'EMERGENCY_CARE' | 'B2B_INQUIRY' | 'PARTNERSHIP' | 'SUPPORT_INQUIRY'
export type SubmissionStatus = 'PENDING' | 'REVIEWING' | 'CONTACTED' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED'
export type Priority = 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT'
export type StoryCategory = 'PARENTING' | 'DAILY_LIFE' | 'ADVOCACY' | 'SUCCESS'
export type ContentStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'PUBLISHED' | 'ARCHIVED'
