import { z } from 'zod'

// 폼 제출 검증 스키마
export const formSubmissionSchema = z.object({
  formType: z.enum(['EMERGENCY_CARE', 'B2B_INQUIRY', 'PARTNERSHIP', 'SUPPORT_INQUIRY'], {
    required_error: '폼 유형을 선택해주세요',
  }),
  name: z
    .string({ required_error: '이름을 입력해주세요' })
    .min(2, '이름은 2자 이상이어야 합니다')
    .max(50, '이름은 50자를 초과할 수 없습니다'),
  email: z
    .string()
    .email('올바른 이메일 주소를 입력해주세요')
    .optional()
    .or(z.literal('')),
  phone: z
    .string({ required_error: '연락처를 입력해주세요' })
    .regex(
      /^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/,
      '올바른 전화번호 형식을 입력해주세요 (예: 010-1234-5678)'
    ),
  organization: z.string().max(100, '기관명은 100자를 초과할 수 없습니다').optional(),
  subject: z.string().max(200, '제목은 200자를 초과할 수 없습니다').optional(),
  message: z
    .string({ required_error: '메시지를 입력해주세요' })
    .min(10, '메시지는 10자 이상이어야 합니다')
    .max(2000, '메시지는 2000자를 초과할 수 없습니다'),
})

export type FormSubmissionInput = z.infer<typeof formSubmissionSchema>

// 긴급돌봄 전용 스키마 (간소화)
export const emergencyCareSchema = z.object({
  name: z
    .string({ required_error: '이름을 입력해주세요' })
    .min(2, '이름은 2자 이상이어야 합니다')
    .max(50),
  phone: z
    .string({ required_error: '연락처를 입력해주세요' })
    .regex(/^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/, '올바른 전화번호 형식을 입력해주세요'),
  message: z
    .string({ required_error: '상황을 설명해주세요' })
    .min(10, '상황 설명은 10자 이상이어야 합니다')
    .max(2000),
})

export type EmergencyCareInput = z.infer<typeof emergencyCareSchema>
