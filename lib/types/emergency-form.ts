/**
 * 긴급돌봄 폼 타입 정의
 */

export interface EmergencyFormData {
  name: string
  phone: string
  message: string
}

export interface EmergencyFormState {
  isSubmitting: boolean
  error: string | null
  fieldErrors: {
    name?: string
    phone?: string
    message?: string
    turnstile?: string
  }
}

export interface EmergencyFormResponse {
  success: boolean
  data?: {
    submissionId: string
    formType: string
    status: string
    priority: string
    createdAt: string
  }
  message?: string
  error?: {
    code: string
    message: string
    details?: Array<{
      field?: string
      message: string
    }>
  }
}
