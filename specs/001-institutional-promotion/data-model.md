# 데이터 모델: DFP Connect 기관 홍보 웹사이트

**프로젝트**: 001-institutional-promotion
**날짜**: 2025-11-18
**기반**: spec.md의 Key Entities 및 Functional Requirements

## 개요

이 문서는 기관 홍보 중심 웹사이트 구축에 필요한 데이터베이스 스키마를 정의한다. 기존 Prisma 스키마를 확장하여 폼 제출, 스토리, 후원 정보 관리 기능을 추가한다.

## 기존 스키마 분석

현재 프로젝트는 다음 엔티티를 보유:
- `UserProfile`: Clerk 통합 사용자 프로필 (UserType: FAMILY, BUSINESS, SUPPORTER, ADMIN)
- `Family`: 가족 정보
- `Service`: 서비스 유형 (ServiceCategory: EMERGENCY_CARE, HOME_TUTORING, etc.)
- `ServiceApplication`: 서비스 신청
- `Reservation`: 예약 관리
- `Notification`: 사용자 알림

**확장 전략**: 기존 스키마를 유지하면서 새로운 엔티티를 추가하여 점진적으로 기능을 확장한다.

---

## 신규 엔티티

### 1. FormSubmission (폼 제출)

긴급돌봄, B2B 문의, 파트너십 제안 등 모든 공개 폼 제출을 통합 관리한다.

**속성**:

| 필드 | 타입 | 제약조건 | 설명 |
|------|------|----------|------|
| id | String | @id @default(cuid()) | 고유 식별자 |
| formType | FormType | required | 폼 유형 (EMERGENCY_CARE, B2B_INQUIRY, PARTNERSHIP, SUPPORT_INQUIRY) |
| name | String | required | 제출자 이름 |
| email | String? | optional | 이메일 (선택) |
| phone | String | required | 연락처 |
| organization | String? | optional | 기관명 (B2B/파트너십 전용) |
| subject | String? | optional | 제목 (문의사항) |
| message | String | required | 메시지 내용 |
| status | SubmissionStatus | @default(PENDING) | 처리 상태 |
| priority | Priority | @default(NORMAL) | 우선순위 (긴급돌봄은 HIGH) |
| assignedTo | String? | optional | 담당자 clerkId (관리자) |
| processedAt | DateTime? | optional | 처리 완료 시각 |
| adminNotes | String? | optional | 관리자 메모 |
| metadata | Json? | optional | 추가 정보 (유연한 확장) |
| ipAddress | String? | optional | 제출 IP (스팸 방지) |
| createdAt | DateTime | @default(now()) | 제출 시각 |
| updatedAt | DateTime | @updatedAt | 수정 시각 |

**관계**:
- `statusHistory: FormStatusHistory[]` - 상태 변경 이력

**검증 규칙** (Zod):
```typescript
// lib/validations/forms.ts
const formSubmissionSchema = z.object({
  formType: z.enum(['EMERGENCY_CARE', 'B2B_INQUIRY', 'PARTNERSHIP', 'SUPPORT_INQUIRY']),
  name: z.string().min(2, '이름은 2자 이상이어야 합니다').max(50),
  email: z.string().email('올바른 이메일을 입력하세요').optional(),
  phone: z.string().regex(/^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/, '올바른 전화번호를 입력하세요'),
  organization: z.string().max(100).optional(),
  subject: z.string().max(200).optional(),
  message: z.string().min(10, '메시지는 10자 이상이어야 합니다').max(2000),
})
```

**인덱스**:
```prisma
@@index([formType, status])
@@index([createdAt])
@@index([assignedTo])
```

---

### 2. FormStatusHistory (폼 상태 이력)

폼 제출의 모든 상태 변경을 추적하여 투명성과 감사 가능성을 확보한다.

**속성**:

| 필드 | 타입 | 제약조건 | 설명 |
|------|------|----------|------|
| id | String | @id @default(cuid()) | 고유 식별자 |
| formId | String | required | FormSubmission ID |
| fromStatus | SubmissionStatus? | optional | 이전 상태 (최초는 null) |
| toStatus | SubmissionStatus | required | 변경된 상태 |
| changedBy | String? | optional | 변경자 clerkId (시스템 변경은 null) |
| notes | String? | optional | 변경 사유 |
| createdAt | DateTime | @default(now()) | 변경 시각 |

**관계**:
- `form: FormSubmission` - 연결된 폼 제출

**인덱스**:
```prisma
@@index([formId, createdAt])
```

---

### 3. Story (가족 이야기/후기)

장애인 가족의 실제 경험담 및 서비스 이용 후기를 관리한다.

**속성**:

| 필드 | 타입 | 제약조건 | 설명 |
|------|------|----------|------|
| id | String | @id @default(cuid()) | 고유 식별자 |
| title | String | required | 제목 |
| content | String | required | 본문 (Markdown 지원) |
| category | StoryCategory | required | 카테고리 (PARENTING, DAILY_LIFE, ADVOCACY, SUCCESS) |
| authorName | String? | optional | 작성자 이름 (익명은 null) |
| isAnonymous | Boolean | @default(false) | 익명 여부 |
| userId | String? | optional | 작성자 clerkId (로그인 사용자) |
| email | String? | optional | 이메일 (비로그인 제출) |
| phone | String? | optional | 연락처 (비로그인 제출) |
| featuredImage | String? | optional | 대표 이미지 URL (GCS) |
| images | String[] | optional | 추가 이미지 URLs |
| status | ContentStatus | @default(PENDING) | 승인 상태 (PENDING, APPROVED, REJECTED, PUBLISHED) |
| reviewedBy | String? | optional | 검토자 clerkId |
| reviewedAt | DateTime? | optional | 검토 시각 |
| reviewNotes | String? | optional | 검토 메모 (거부 사유 등) |
| publishedAt | DateTime? | optional | 게시 시각 |
| viewCount | Int | @default(0) | 조회수 |
| featuredOrder | Int? | optional | 추천 순서 (null이면 일반) |
| tags | String[] | optional | 태그 (검색용) |
| createdAt | DateTime | @default(now()) | 작성 시각 |
| updatedAt | DateTime | @updatedAt | 수정 시각 |

**관계**:
- `author: UserProfile?` - 작성자 (로그인 사용자)
- `statusHistory: StoryStatusHistory[]` - 상태 변경 이력

**검증 규칙** (Zod):
```typescript
// lib/validations/stories.ts
const storySubmissionSchema = z.object({
  title: z.string().min(5, '제목은 5자 이상이어야 합니다').max(100),
  content: z.string().min(50, '내용은 50자 이상이어야 합니다').max(10000),
  category: z.enum(['PARENTING', 'DAILY_LIFE', 'ADVOCACY', 'SUCCESS']),
  authorName: z.string().max(50).optional(),
  isAnonymous: z.boolean().default(false),
  email: z.string().email().optional(),
  phone: z.string().regex(/^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/).optional(),
  featuredImage: z.string().url().optional(),
  tags: z.array(z.string().max(20)).max(5).optional(),
})
```

**인덱스**:
```prisma
@@index([status, publishedAt])
@@index([category, status])
@@index([featuredOrder])
@@index([userId])
```

**전문 검색 인덱스** (PostgreSQL):
```sql
CREATE INDEX idx_stories_fulltext ON stories USING GIN(
  to_tsvector('korean', title || ' ' || content)
);
```

---

### 4. StoryStatusHistory (스토리 상태 이력)

스토리 승인 워크플로우의 모든 상태 전환을 기록한다.

**속성**:

| 필드 | 타입 | 제약조건 | 설명 |
|------|------|----------|------|
| id | String | @id @default(cuid()) | 고유 식별자 |
| storyId | String | required | Story ID |
| fromStatus | ContentStatus? | optional | 이전 상태 |
| toStatus | ContentStatus | required | 변경된 상태 |
| changedBy | String? | optional | 변경자 clerkId |
| notes | String? | optional | 변경 사유/메모 |
| createdAt | DateTime | @default(now()) | 변경 시각 |

**관계**:
- `story: Story` - 연결된 스토리

**인덱스**:
```prisma
@@index([storyId, createdAt])
```

---

### 5. DonationAccount (후원 계좌 정보)

후원 계좌 정보를 데이터베이스에서 관리하여 유연한 변경 및 다중 계좌 지원을 가능하게 한다.

**속성**:

| 필드 | 타입 | 제약조건 | 설명 |
|------|------|----------|------|
| id | String | @id @default(cuid()) | 고유 식별자 |
| bankName | String | required | 은행명 |
| accountNumber | String | required | 계좌번호 |
| accountHolder | String | required | 예금주 |
| purpose | String? | optional | 용도 (예: "일반 후원", "긴급돌봄 후원") |
| isActive | Boolean | @default(true) | 활성 여부 |
| displayOrder | Int | @default(0) | 표시 순서 |
| createdAt | DateTime | @default(now()) | 생성 시각 |
| updatedAt | DateTime | @updatedAt | 수정 시각 |

**인덱스**:
```prisma
@@index([isActive, displayOrder])
```

---

## Enum 정의

### FormType
```prisma
enum FormType {
  EMERGENCY_CARE      // 긴급돌봄 요청
  B2B_INQUIRY         // B2B 문의
  PARTNERSHIP         // 파트너십 제안
  SUPPORT_INQUIRY     // 후원 문의
}
```

### SubmissionStatus
```prisma
enum SubmissionStatus {
  PENDING       // 대기 중
  REVIEWING     // 검토 중
  CONTACTED     // 연락 완료
  IN_PROGRESS   // 진행 중
  RESOLVED      // 해결됨
  CLOSED        // 종결
}
```

### Priority
```prisma
enum Priority {
  LOW           // 낮음
  NORMAL        // 보통
  HIGH          // 높음 (긴급돌봄)
  URGENT        // 긴급
}
```

### StoryCategory
```prisma
enum StoryCategory {
  PARENTING     // 양육
  DAILY_LIFE    // 일상생활
  ADVOCACY      // 권익옹호
  SUCCESS       // 성공사례
}
```

### ContentStatus
```prisma
enum ContentStatus {
  PENDING       // 승인 대기
  APPROVED      // 승인됨 (아직 미게시)
  REJECTED      // 거부됨
  PUBLISHED     // 게시됨 (공개)
  ARCHIVED      // 보관됨
}
```

---

## 상태 전환 규칙

### FormSubmission 워크플로우

```
PENDING → REVIEWING → CONTACTED → IN_PROGRESS → RESOLVED → CLOSED
        ↓
      CLOSED (처리 불가)
```

**허용된 전환**:
- PENDING → REVIEWING, CLOSED
- REVIEWING → CONTACTED, CLOSED
- CONTACTED → IN_PROGRESS, CLOSED
- IN_PROGRESS → RESOLVED, REVIEWING
- RESOLVED → CLOSED

**자동 전환**:
- 긴급돌봄 폼 제출 시: priority = HIGH 자동 설정
- 관리자 할당 시: PENDING → REVIEWING

### Story 승인 워크플로우

```
PENDING → APPROVED → PUBLISHED
        ↓           ↓
      REJECTED    ARCHIVED
```

**허용된 전환**:
- PENDING → APPROVED, REJECTED
- APPROVED → PUBLISHED, REJECTED
- PUBLISHED → ARCHIVED
- REJECTED → PENDING (재검토)

**자동 전환**:
- 승인 시: status = APPROVED, reviewedAt = now()
- 게시 시: status = PUBLISHED, publishedAt = now()

---

## 데이터 관계 다이어그램

```
UserProfile (기존)
    ↓ 1:N
Story (신규)
    ↓ 1:N
StoryStatusHistory (신규)

FormSubmission (신규)
    ↓ 1:N
FormStatusHistory (신규)

DonationAccount (신규) - 독립 엔티티
```

---

## 마이그레이션 계획

### Phase 1: 핵심 엔티티 추가
1. `FormType`, `SubmissionStatus`, `Priority` enum 추가
2. `FormSubmission` 모델 추가
3. `FormStatusHistory` 모델 추가

### Phase 2: 콘텐츠 관리 추가
4. `StoryCategory`, `ContentStatus` enum 추가
5. `Story` 모델 추가
6. `StoryStatusHistory` 모델 추가
7. `UserProfile`과 `Story` 관계 설정

### Phase 3: 후원 기능 추가
8. `DonationAccount` 모델 추가
9. 시드 데이터 (기본 계좌 정보)

### Phase 4: 인덱스 최적화
10. PostgreSQL 전문 검색 인덱스 추가 (프로덕션)
11. 복합 인덱스 성능 검증

---

## 보안 및 개인정보 보호

### 민감 정보 처리

**암호화 필요 항목**:
- `FormSubmission.phone`
- `FormSubmission.email`
- `Story.email`
- `Story.phone`
- `DonationAccount.accountNumber`

**구현 방법**:
```typescript
// lib/crypto.ts
import crypto from 'crypto'

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY! // 32 bytes
const ALGORITHM = 'aes-256-gcm'

export function encrypt(text: string): string {
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv(ALGORITHM, ENCRYPTION_KEY, iv)
  const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()])
  const authTag = cipher.getAuthTag()
  return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted.toString('hex')}`
}

export function decrypt(encrypted: string): string {
  const [ivHex, authTagHex, encryptedHex] = encrypted.split(':')
  const decipher = crypto.createDecipheriv(ALGORITHM, ENCRYPTION_KEY, Buffer.from(ivHex, 'hex'))
  decipher.setAuthTag(Buffer.from(authTagHex, 'hex'))
  return decipher.update(Buffer.from(encryptedHex, 'hex')) + decipher.final('utf8')
}
```

### 접근 제어

**권한 매트릭스**:

| 엔티티 | FAMILY | BUSINESS | SUPPORTER | ADMIN |
|--------|--------|----------|-----------|-------|
| FormSubmission (생성) | ✅ | ✅ | ✅ | ✅ |
| FormSubmission (조회) | ❌ | ❌ | ❌ | ✅ |
| FormSubmission (수정) | ❌ | ❌ | ❌ | ✅ |
| Story (생성) | ✅ | ❌ | ❌ | ✅ |
| Story (조회 - PUBLISHED) | ✅ | ✅ | ✅ | ✅ |
| Story (조회 - PENDING) | 본인만 | ❌ | ❌ | ✅ |
| Story (승인/거부) | ❌ | ❌ | ❌ | ✅ |
| DonationAccount (조회) | ✅ | ✅ | ✅ | ✅ |
| DonationAccount (수정) | ❌ | ❌ | ❌ | ✅ |

---

## 성능 최적화

### 쿼리 최적화

**자주 실행되는 쿼리**:

1. **관리자 대시보드 - 대기 중인 폼**:
```typescript
await prisma.formSubmission.findMany({
  where: { status: 'PENDING' },
  orderBy: { createdAt: 'desc' },
  take: 20,
  include: {
    statusHistory: {
      orderBy: { createdAt: 'desc' },
      take: 1,
    },
  },
})
```

2. **공개 스토리 목록 (필터링)**:
```typescript
await prisma.story.findMany({
  where: {
    status: 'PUBLISHED',
    category: category || undefined,
  },
  orderBy: [
    { featuredOrder: 'asc' }, // 추천 스토리 우선
    { publishedAt: 'desc' },
  ],
  take: 12,
  skip: (page - 1) * 12,
})
```

3. **전문 검색 (PostgreSQL)**:
```typescript
await prisma.$queryRaw`
  SELECT * FROM stories
  WHERE status = 'PUBLISHED'
    AND to_tsvector('korean', title || ' ' || content) @@ plainto_tsquery('korean', ${query})
  ORDER BY ts_rank(to_tsvector('korean', title || ' ' || content), plainto_tsquery('korean', ${query})) DESC
  LIMIT 20
`
```

### 캐싱 전략

**Redis 캐싱** (Upstash):
- 게시된 스토리 목록: 5분 TTL
- 후원 계좌 정보: 1시간 TTL
- 서비스 카테고리 목록: 1시간 TTL

```typescript
// lib/cache.ts
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

export async function getCachedStories(category?: string) {
  const cacheKey = `stories:published:${category || 'all'}`
  const cached = await redis.get(cacheKey)

  if (cached) return cached

  const stories = await prisma.story.findMany({ /* ... */ })
  await redis.setex(cacheKey, 300, stories) // 5분 TTL
  return stories
}
```

---

## 데이터 검증 및 제약조건

### 비즈니스 규칙

1. **긴급돌봄 폼**: 제출 시 자동으로 `priority = HIGH` 설정
2. **익명 스토리**: `isAnonymous = true`이면 `authorName = null` 강제
3. **게시된 스토리**: `status = PUBLISHED`이면 `publishedAt`이 반드시 존재
4. **활성 계좌**: 최소 1개 이상의 `isActive = true` 계좌 유지

### 데이터베이스 제약조건 (Prisma)

```prisma
model Story {
  // ...

  @@check("published_requires_date", sql: "status != 'PUBLISHED' OR published_at IS NOT NULL")
  @@check("anonymous_no_author", sql: "is_anonymous = false OR author_name IS NULL")
}

model FormSubmission {
  // ...

  @@check("emergency_high_priority", sql: "form_type != 'EMERGENCY_CARE' OR priority IN ('HIGH', 'URGENT')")
}
```

---

## 시드 데이터

### 기본 후원 계좌
```typescript
// prisma/seed.ts
await prisma.donationAccount.createMany({
  data: [
    {
      bankName: '신한은행',
      accountNumber: '110-123-456789',
      accountHolder: '장애와가족플랫폼 사회적협동조합',
      purpose: '일반 후원',
      isActive: true,
      displayOrder: 1,
    },
    {
      bankName: '국민은행',
      accountNumber: '012-34-5678-901',
      accountHolder: '장애와가족플랫폼 사회적협동조합',
      purpose: '긴급돌봄 지원',
      isActive: true,
      displayOrder: 2,
    },
  ],
})
```

### 샘플 스토리 (개발/테스트용)
```typescript
await prisma.story.createMany({
  data: [
    {
      title: '우리 아이의 첫 홈티 경험',
      content: '...',
      category: 'SUCCESS',
      authorName: '김OO',
      isAnonymous: false,
      status: 'PUBLISHED',
      publishedAt: new Date(),
      featuredOrder: 1,
    },
    // 더 많은 샘플 데이터...
  ],
})
```

---

## 다음 단계

1. ✅ 데이터 모델 정의 완료
2. ⏭️ API 계약 정의 (`contracts/public-api.yaml`, `contracts/admin-api.yaml`)
3. ⏭️ Prisma 마이그레이션 생성 및 적용
4. ⏭️ Zod 검증 스키마 구현
5. ⏭️ API Route Handlers 구현
6. ⏭️ UI 컴포넌트 및 페이지 구현
