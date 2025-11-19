# 빠른 시작 가이드: DFP Connect 기관 홍보 웹사이트

**프로젝트**: 001-institutional-promotion
**대상**: 개발자
**업데이트**: 2025-11-18

## 개요

이 가이드는 DFP Connect 기관 홍보 웹사이트 기능을 로컬에서 설정하고 개발을 시작하는 방법을 안내합니다.

## 사전 요구사항

- **Node.js**: 20.x 이상
- **npm**: 10.x 이상
- **Git**: 최신 버전
- **Docker**: (선택) 로컬 PostgreSQL 실행용
- **Clerk 계정**: 인증 설정용
- **Google Cloud 계정**: (선택) GCS 이미지 업로드용

## 1. 저장소 클론 및 브랜치 전환

```bash
# 저장소가 이미 클론되어 있다면 스킵
cd /path/to/DFP_Connect

# 기능 브랜치로 전환
git checkout 001-institutional-promotion

# 최신 변경사항 pull (있다면)
git pull origin 001-institutional-promotion
```

## 2. 의존성 설치

```bash
# Node.js 의존성 설치
npm install

# 추가 의존성 (이번 기능에서 필요한 패키지)
npm install @upstash/redis sharp react-markdown remark-gfm @t3-oss/env-nextjs
npm install -D @types/react-markdown
```

## 3. 환경 변수 설정

`.env.local` 파일을 생성하고 다음 내용을 추가하세요:

```env
# Database (개발환경은 SQLite 사용)
DATABASE_URL="file:./dev.db"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Encryption (32 bytes hex string - 생성 방법 아래 참조)
ENCRYPTION_KEY=your_64_character_hex_string

# Cloudflare Turnstile (스팸 방지)
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_site_key
TURNSTILE_SECRET_KEY=your_secret_key

# Upstash Redis (캐싱 및 Rate Limiting)
UPSTASH_REDIS_REST_URL=your_redis_rest_url
UPSTASH_REDIS_REST_TOKEN=your_redis_rest_token

# Google Cloud Storage (선택 - 이미지 업로드)
GCS_BUCKET_NAME=dfp-connect-uploads
GCS_PROJECT_ID=marketsphere-476701
GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account-key.json

# Resend (선택 - 이메일 알림)
RESEND_API_KEY=your_resend_api_key
RESEND_FROM_EMAIL=noreply@dfp.or.kr

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 환경 변수 생성 도구

**Encryption Key 생성**:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Clerk 키 발급**:
1. https://clerk.com/ 에서 로그인
2. 프로젝트 생성 또는 기존 프로젝트 선택
3. API Keys 탭에서 키 복사

**Cloudflare Turnstile 키 발급**:
1. https://dash.cloudflare.com/ 에서 로그인
2. Turnstile 메뉴 선택
3. 새 사이트 추가 (localhost 도메인 포함)
4. 사이트 키 및 비밀 키 복사

**Upstash Redis 설정**:
1. https://upstash.com/ 에서 로그인
2. 새 Redis 데이터베이스 생성 (서울 리전 선택)
3. REST API 탭에서 URL 및 토큰 복사

## 4. 데이터베이스 설정

### 4.1 Prisma 스키마 확장

`prisma/schema.prisma` 파일에 새로운 모델 추가 (이미 추가되어 있다면 스킵):

```prisma
// 폼 제출
model FormSubmission {
  id           String             @id @default(cuid())
  formType     FormType
  name         String
  email        String?
  phone        String
  organization String?
  subject      String?
  message      String
  status       SubmissionStatus   @default(PENDING)
  priority     Priority           @default(NORMAL)
  assignedTo   String?
  processedAt  DateTime?
  adminNotes   String?
  metadata     Json?
  ipAddress    String?
  createdAt    DateTime           @default(now())
  updatedAt    DateTime           @updatedAt

  statusHistory FormStatusHistory[]

  @@index([formType, status])
  @@index([createdAt])
  @@index([assignedTo])
  @@map("form_submissions")
}

model FormStatusHistory {
  id         String            @id @default(cuid())
  formId     String
  fromStatus SubmissionStatus?
  toStatus   SubmissionStatus
  changedBy  String?
  notes      String?
  createdAt  DateTime          @default(now())

  form FormSubmission @relation(fields: [formId], references: [id], onDelete: Cascade)

  @@index([formId, createdAt])
  @@map("form_status_history")
}

// 스토리
model Story {
  id             String              @id @default(cuid())
  title          String
  content        String
  category       StoryCategory
  authorName     String?
  isAnonymous    Boolean             @default(false)
  userId         String?
  email          String?
  phone          String?
  featuredImage  String?
  images         String[]
  status         ContentStatus       @default(PENDING)
  reviewedBy     String?
  reviewedAt     DateTime?
  reviewNotes    String?
  publishedAt    DateTime?
  viewCount      Int                 @default(0)
  featuredOrder  Int?
  tags           String[]
  createdAt      DateTime            @default(now())
  updatedAt      DateTime            @updatedAt

  author        UserProfile?        @relation(fields: [userId], references: [id])
  statusHistory StoryStatusHistory[]

  @@index([status, publishedAt])
  @@index([category, status])
  @@index([featuredOrder])
  @@index([userId])
  @@map("stories")
}

model StoryStatusHistory {
  id         String         @id @default(cuid())
  storyId    String
  fromStatus ContentStatus?
  toStatus   ContentStatus
  changedBy  String?
  notes      String?
  createdAt  DateTime       @default(now())

  story Story @relation(fields: [storyId], references: [id], onDelete: Cascade)

  @@index([storyId, createdAt])
  @@map("story_status_history")
}

// 후원 계좌
model DonationAccount {
  id            String   @id @default(cuid())
  bankName      String
  accountNumber String
  accountHolder String
  purpose       String?
  isActive      Boolean  @default(true)
  displayOrder  Int      @default(0)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  @@index([isActive, displayOrder])
  @@map("donation_accounts")
}

// Enums
enum FormType {
  EMERGENCY_CARE
  B2B_INQUIRY
  PARTNERSHIP
  SUPPORT_INQUIRY
}

enum SubmissionStatus {
  PENDING
  REVIEWING
  CONTACTED
  IN_PROGRESS
  RESOLVED
  CLOSED
}

enum Priority {
  LOW
  NORMAL
  HIGH
  URGENT
}

enum StoryCategory {
  PARENTING
  DAILY_LIFE
  ADVOCACY
  SUCCESS
}

enum ContentStatus {
  PENDING
  APPROVED
  REJECTED
  PUBLISHED
  ARCHIVED
}
```

**UserProfile 모델 확장** (이미 있는 모델에 추가):
```prisma
model UserProfile {
  // ... 기존 필드들

  stories Story[] // 이 줄 추가
}
```

### 4.2 마이그레이션 생성 및 적용

```bash
# Prisma 클라이언트 생성
npx prisma generate

# 마이그레이션 생성
npx prisma migrate dev --name add-institutional-promotion-models

# 데이터베이스 초기화 확인
npx prisma db push
```

### 4.3 시드 데이터 추가

`prisma/seed.ts` 파일에 다음 내용 추가:

```typescript
// 후원 계좌 데이터
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

// 샘플 스토리 데이터
await prisma.story.createMany({
  data: [
    {
      title: '우리 아이의 첫 홈티 경험',
      content: '방과후 홈티 서비스를 이용한 지 3개월이 되었습니다...',
      category: 'SUCCESS',
      authorName: '김OO',
      isAnonymous: false,
      status: 'PUBLISHED',
      publishedAt: new Date(),
      featuredOrder: 1,
      tags: ['홈티', '성장', '감사'],
    },
    {
      title: '긴급돌봄이 우리 가족을 구했어요',
      content: '갑자기 보호자가 입원하게 되어 막막했는데...',
      category: 'PARENTING',
      authorName: null,
      isAnonymous: true,
      status: 'PUBLISHED',
      publishedAt: new Date(),
      tags: ['긴급돌봄', '감사'],
    },
  ],
})

console.log('✅ 시드 데이터 추가 완료')
```

**시드 실행**:
```bash
npm run db:seed
```

## 5. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 http://localhost:3000 을 열어 확인하세요.

## 6. 주요 개발 경로

### 공개 페이지

- **메인 랜딩**: http://localhost:3000/
- **소개 및 비전**: http://localhost:3000/about
- **서비스**: http://localhost:3000/services
- **가족 이야기**: http://localhost:3000/stories
- **B2B 협력**: http://localhost:3000/b2b
- **후원**: http://localhost:3000/support

### 관리자 대시보드

- **관리자 홈**: http://localhost:3000/admin
- **폼 관리**: http://localhost:3000/admin/forms
- **스토리 승인**: http://localhost:3000/admin/stories

**관리자 계정 설정**:
1. 일반 회원가입 후
2. Prisma Studio에서 `UserType`을 `ADMIN`으로 변경

```bash
# Prisma Studio 실행
npx prisma studio

# UserProfile 테이블에서 해당 사용자 찾아 userType을 ADMIN으로 변경
```

## 7. 개발 워크플로우

### 7.1 새 컴포넌트 추가

```bash
# 공개 페이지 컴포넌트
touch components/public/persona-cards.tsx

# 관리자 컴포넌트
touch components/admin/form-list.tsx

# UI 컴포넌트 (shadcn/ui)
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add dialog
```

### 7.2 API Route 추가

```bash
# 공개 API
touch app/api/forms/route.ts
touch app/api/stories/route.ts

# 관리자 API
touch app/api/admin/forms/route.ts
touch app/api/admin/stories/[id]/route.ts
```

### 7.3 Zod 검증 스키마 추가

```bash
mkdir -p lib/validations
touch lib/validations/forms.ts
touch lib/validations/stories.ts
```

**예시** (`lib/validations/forms.ts`):
```typescript
import { z } from 'zod'

export const formSubmissionSchema = z.object({
  formType: z.enum(['EMERGENCY_CARE', 'B2B_INQUIRY', 'PARTNERSHIP', 'SUPPORT_INQUIRY']),
  name: z.string().min(2).max(50),
  email: z.string().email().optional(),
  phone: z.string().regex(/^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/),
  organization: z.string().max(100).optional(),
  subject: z.string().max(200).optional(),
  message: z.string().min(10).max(2000),
})

export type FormSubmissionInput = z.infer<typeof formSubmissionSchema>
```

## 8. 테스트

### 8.1 단위 테스트 (Jest)

```bash
# Jest 설정
npm install -D jest @testing-library/react @testing-library/jest-dom jest-environment-jsdom

# 테스트 실행
npm test
```

**테스트 파일 예시** (`__tests__/components/persona-cards.test.tsx`):
```typescript
import { render, screen } from '@testing-library/react'
import PersonaCards from '@/components/public/persona-cards'

describe('PersonaCards', () => {
  it('renders all 3 persona cards', () => {
    render(<PersonaCards />)
    expect(screen.getByText('장애인 가족')).toBeInTheDocument()
    expect(screen.getByText('협력 기관')).toBeInTheDocument()
    expect(screen.getByText('후원 파트너')).toBeInTheDocument()
  })
})
```

### 8.2 E2E 테스트 (Playwright)

```bash
# Playwright 설치
npm install -D @playwright/test

# 테스트 실행
npx playwright test

# UI 모드로 실행
npx playwright test --ui
```

**테스트 파일 예시** (`e2e/emergency-form.spec.ts`):
```typescript
import { test, expect } from '@playwright/test'

test('긴급돌봄 폼 제출', async ({ page }) => {
  await page.goto('http://localhost:3000/services')

  // 긴급돌봄 폼 찾기
  await page.click('text=긴급돌봄')

  // 폼 입력
  await page.fill('input[name="name"]', '김영희')
  await page.fill('input[name="phone"]', '010-1234-5678')
  await page.fill('textarea[name="message"]', '보호자가 갑자기 입원하여 도움이 필요합니다')

  // 제출
  await page.click('button[type="submit"]')

  // 성공 메시지 확인
  await expect(page.locator('text=요청이 접수되었습니다')).toBeVisible()
})
```

## 9. 빌드 및 배포

### 로컬 빌드 테스트

```bash
# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start
```

### Docker 빌드 (선택)

```bash
# Docker 이미지 빌드
docker build -t dfp-connect:latest .

# 로컬 실행
docker run -p 3000:3000 --env-file .env.local dfp-connect:latest
```

### GCP Cloud Run 배포

```bash
# GCP 프로젝트 설정
gcloud config set project marketsphere-476701

# Cloud Build를 통한 배포
gcloud builds submit --config cloudbuild.yaml

# 또는 직접 Cloud Run 배포
gcloud run deploy dfp-connect \
  --source . \
  --region asia-northeast3 \
  --platform managed \
  --allow-unauthenticated
```

## 10. 트러블슈팅

### 문제: Prisma 클라이언트 에러

```bash
# Prisma 클라이언트 재생성
npx prisma generate

# 캐시 제거 후 재설치
rm -rf node_modules/.prisma
npm install
```

### 문제: 환경 변수 로드 안 됨

- `.env.local` 파일이 저장소 루트에 있는지 확인
- 개발 서버 재시작 (`Ctrl+C` 후 `npm run dev`)

### 문제: Clerk 인증 실패

- Clerk Dashboard에서 허용된 도메인에 `localhost:3000` 추가
- API 키가 올바른지 확인

### 문제: 데이터베이스 마이그레이션 실패

```bash
# 데이터베이스 리셋 (주의: 모든 데이터 삭제)
npx prisma migrate reset

# 마이그레이션 재실행
npx prisma migrate dev
```

## 11. 유용한 명령어

```bash
# Prisma Studio (데이터베이스 GUI)
npx prisma studio

# TypeScript 타입 체크
npx tsc --noEmit

# ESLint 검사
npm run lint

# 코드 포맷팅
npx prettier --write .

# 의존성 보안 검사
npm audit

# 번들 크기 분석
npm run build && npx @next/bundle-analyzer
```

## 12. 다음 단계

1. ✅ 로컬 환경 설정 완료
2. ⏭️ 공개 페이지 구현 시작 (`app/(public)/page.tsx`)
3. ⏭️ API Route Handlers 구현
4. ⏭️ 관리자 대시보드 구현
5. ⏭️ 테스트 작성
6. ⏭️ 프로덕션 배포

## 13. 참고 문서

- **프로젝트 문서**:
  - [spec.md](./spec.md) - 기능 명세
  - [data-model.md](./data-model.md) - 데이터 모델
  - [contracts/](./contracts/) - API 계약
- **기술 문서**:
  - [Next.js App Router](https://nextjs.org/docs/app)
  - [Prisma](https://www.prisma.io/docs)
  - [Clerk](https://clerk.com/docs)
  - [Tailwind CSS](https://tailwindcss.com/docs)
  - [shadcn/ui](https://ui.shadcn.com/)

## 14. 도움이 필요하신가요?

- **팀 채널**: Slack #dfp-connect-dev
- **이슈 트래킹**: GitHub Issues
- **문의**: contact@dfp.or.kr

---

**마지막 업데이트**: 2025-11-18 | **문서 버전**: 1.0
