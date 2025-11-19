import { z } from 'zod'

// 스토리 제출 검증 스키마
export const storySubmissionSchema = z.object({
  title: z
    .string({ required_error: '제목을 입력해주세요' })
    .min(5, '제목은 5자 이상이어야 합니다')
    .max(100, '제목은 100자를 초과할 수 없습니다'),
  content: z
    .string({ required_error: '내용을 입력해주세요' })
    .min(50, '내용은 50자 이상이어야 합니다')
    .max(10000, '내용은 10000자를 초과할 수 없습니다'),
  category: z.enum(['PARENTING', 'DAILY_LIFE', 'ADVOCACY', 'SUCCESS'], {
    required_error: '카테고리를 선택해주세요',
  }),
  authorName: z.string().max(50, '작성자명은 50자를 초과할 수 없습니다').optional(),
  isAnonymous: z.boolean().default(false),
  email: z.string().email('올바른 이메일 주소를 입력해주세요').optional().or(z.literal('')),
  phone: z
    .string()
    .regex(/^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/, '올바른 전화번호 형식을 입력해주세요')
    .optional()
    .or(z.literal('')),
  featuredImage: z.string().url('올바른 URL을 입력해주세요').optional().or(z.literal('')),
  tags: z.array(z.string().max(20, '태그는 20자를 초과할 수 없습니다')).max(5, '태그는 최대 5개까지 가능합니다').optional(),
})

export type StorySubmissionInput = z.infer<typeof storySubmissionSchema>

// 스토리 검색/필터 스키마
export const storyFilterSchema = z.object({
  category: z.enum(['PARENTING', 'DAILY_LIFE', 'ADVOCACY', 'SUCCESS']).optional(),
  search: z.string().max(100, '검색어는 100자를 초과할 수 없습니다').optional(),
  page: z.number().int().min(1, '페이지는 1 이상이어야 합니다').default(1),
  limit: z.number().int().min(1).max(50, '한 번에 최대 50개까지 조회 가능합니다').default(12),
})

export type StoryFilterInput = z.infer<typeof storyFilterSchema>
