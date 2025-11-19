# 기술 조사 보고서 (Technical Research)

**프로젝트**: DFP Connect - 기관 홍보 사이트
**작성일**: 2025-11-18
**대상 스택**: Next.js 16 (App Router), TypeScript 5.9, Prisma 6.18, PostgreSQL, GCP Cloud Run

---

## 목차

1. [관리자 대시보드 구현 패턴](#1-관리자-대시보드-구현-패턴)
2. [콘텐츠 승인 워크플로우](#2-콘텐츠-승인-워크플로우)
3. [이미지 최적화 및 CDN 전략](#3-이미지-최적화-및-cdn-전략)
4. [검색 및 필터링 구현](#4-검색-및-필터링-구현)
5. [폼 스팸 방지](#5-폼-스팸-방지)
6. [성능 모니터링 및 에러 추적](#6-성능-모니터링-및-에러-추적)

---

## 1. 관리자 대시보드 구현 패턴

### 결정 (Decision)

**Server Components 우선 + Client Components 선택적 사용 + React Server Actions**

- 대시보드 레이아웃 및 데이터 표시: Server Components
- 상호작용 요소 (필터, 정렬, 페이지네이션): Client Components
- 데이터 변경 작업: React Server Actions
- 실시간 업데이트: Polling (30초 간격) + 수동 새로고침

### 근거 (Rationale)

#### 1.1 Server Components 우선 전략

**장점:**
- **초기 로딩 성능**: 관리자 대시보드는 많은 데이터를 표시하므로 서버에서 렌더링하여 초기 번들 크기 감소
- **보안**: 데이터베이스 쿼리 로직이 서버에만 존재하여 민감한 정보 노출 위험 감소
- **SEO 불필요**: 관리자 페이지는 인증 필요하므로 SEO 고려 불필요
- **Zero JavaScript**: 정적 콘텐츠는 클라이언트 JS 없이 렌더링

**Next.js 16 App Router 패턴:**
```typescript
// app/admin/submissions/page.tsx (Server Component)
import { prisma } from '@/lib/prisma';
import { SubmissionTable } from './SubmissionTable';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function SubmissionsPage({
  searchParams,
}: {
  searchParams: { status?: string; page?: string };
}) {
  const session = await auth();
  if (!session?.user?.isAdmin) {
    redirect('/login');
  }

  const page = parseInt(searchParams.page || '1');
  const status = searchParams.status || 'all';

  // 서버에서 직접 데이터 페칭 - 추가 API 레이어 불필요
  const submissions = await prisma.counselingRequest.findMany({
    where: status !== 'all' ? { status } : undefined,
    skip: (page - 1) * 20,
    take: 20,
    orderBy: { createdAt: 'desc' },
  });

  const total = await prisma.counselingRequest.count({
    where: status !== 'all' ? { status } : undefined,
  });

  return (
    <div>
      <h1>상담 신청 관리</h1>
      <SubmissionTable
        submissions={submissions}
        total={total}
        currentPage={page}
      />
    </div>
  );
}
```

#### 1.2 Client Components for Interactivity

**사용 사례:**
- 필터 드롭다운
- 정렬 버튼
- 모달 다이얼로그
- 토글 스위치
- 실시간 검색

```typescript
// app/admin/submissions/SubmissionTable.tsx (Client Component)
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function SubmissionTable({ submissions, total, currentPage }) {
  const router = useRouter();
  const [statusFilter, setStatusFilter] = useState('all');

  const handleFilterChange = (newStatus: string) => {
    setStatusFilter(newStatus);
    // URL 기반 상태 관리로 새로고침 시 상태 유지
    router.push(`/admin/submissions?status=${newStatus}&page=1`);
  };

  return (
    <div>
      <select value={statusFilter} onChange={(e) => handleFilterChange(e.target.value)}>
        <option value="all">전체</option>
        <option value="pending">대기중</option>
        <option value="approved">승인됨</option>
      </select>
      {/* 테이블 렌더링 */}
    </div>
  );
}
```

#### 1.3 React Server Actions for Mutations

**장점:**
- **타입 안전성**: TypeScript로 클라이언트-서버 간 타입 공유
- **간소화된 API**: 별도의 API 라우트 불필요
- **Progressive Enhancement**: JavaScript 비활성화 시에도 폼 동작
- **낙관적 업데이트**: useOptimistic 훅 사용 가능

```typescript
// app/admin/actions.ts
'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const approvalSchema = z.object({
  id: z.string(),
  status: z.enum(['approved', 'rejected']),
  adminNote: z.string().optional(),
});

export async function approveSubmission(formData: FormData) {
  const session = await auth();
  if (!session?.user?.isAdmin) {
    throw new Error('Unauthorized');
  }

  const data = approvalSchema.parse({
    id: formData.get('id'),
    status: formData.get('status'),
    adminNote: formData.get('adminNote'),
  });

  await prisma.counselingRequest.update({
    where: { id: data.id },
    data: {
      status: data.status,
      adminNote: data.adminNote,
      reviewedAt: new Date(),
      reviewedBy: session.user.id,
    },
  });

  // 캐시 무효화하여 UI 자동 업데이트
  revalidatePath('/admin/submissions');

  return { success: true };
}
```

#### 1.4 Polling vs Real-time Updates

**결정: Polling (30초 간격) + 수동 새로고침 버튼**

**근거:**
- **규모**: 100-500 동시 사용자 중 관리자는 2-5명 정도로 예상
- **빈도**: 상담 신청은 시간당 5-10건 정도로 실시간성이 크리티컬하지 않음
- **복잡도**: WebSocket/SSE는 GCP Cloud Run의 stateless 특성과 맞지 않음
- **비용**: 실시간 인프라 비용 대비 효과 낮음

**구현:**
```typescript
// app/admin/submissions/RefreshButton.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export function RefreshButton() {
  const router = useRouter();
  const [lastRefresh, setLastRefresh] = useState(Date.now());

  // 30초 자동 폴링
  useEffect(() => {
    const interval = setInterval(() => {
      router.refresh(); // Server Component 재실행
      setLastRefresh(Date.now());
    }, 30000);

    return () => clearInterval(interval);
  }, [router]);

  const handleManualRefresh = () => {
    router.refresh();
    setLastRefresh(Date.now());
  };

  return (
    <button onClick={handleManualRefresh}>
      새로고침 (마지막: {new Date(lastRefresh).toLocaleTimeString('ko-KR')})
    </button>
  );
}
```

### 고려한 대안 (Alternatives Considered)

#### 대안 1: SWR / React Query (클라이언트 데이터 페칭)

**장점:**
- 강력한 캐싱 및 재검증 전략
- 낙관적 업데이트 지원
- 자동 재시도 및 에러 핸들링

**단점:**
- Next.js 16 Server Components의 이점을 활용하지 못함
- 추가 API 라우트 필요 (코드 중복)
- 클라이언트 번들 크기 증가 (SWR: ~4KB, React Query: ~13KB)
- 초기 로딩 시 클라이언트에서 추가 요청 발생

**거부 이유:** Server Components로 충분히 해결 가능하며, 100-500 동시 사용자 규모에서는 오버엔지니어링

#### 대안 2: WebSocket / Server-Sent Events (실시간 업데이트)

**장점:**
- 진정한 실시간 업데이트
- 서버 푸시 방식으로 효율적

**단점:**
- GCP Cloud Run은 stateless 컨테이너로 WebSocket 지속 연결 어려움
- 추가 인프라 필요 (Redis Pub/Sub, Firebase Realtime Database 등)
- 구현 및 유지보수 복잡도 증가
- 비용 증가 (연결 유지 비용)

**거부 이유:** 상담 신청 빈도가 낮아 실시간성 필요성 낮음, 인프라 복잡도 대비 효과 미미

#### 대안 3: Full Client-Side Rendering (SPA 방식)

**장점:**
- 풍부한 상호작용성
- 상태 관리 라이브러리 활용 용이

**단점:**
- 초기 로딩 성능 저하
- SEO 불필요하지만 초기 렌더링 느림
- 클라이언트 번들 크기 대폭 증가
- 보안 위험 (API 키, 비즈니스 로직 노출 가능)

**거부 이유:** Next.js App Router의 하이브리드 접근 방식이 더 적합

### 구현 가이드 (Implementation Guide)

#### 1. 폴더 구조

```
app/
├── admin/
│   ├── layout.tsx              # 관리자 레이아웃 (Server Component)
│   ├── submissions/
│   │   ├── page.tsx            # 목록 페이지 (Server Component)
│   │   ├── [id]/
│   │   │   └── page.tsx        # 상세 페이지 (Server Component)
│   │   ├── SubmissionTable.tsx # 테이블 UI (Client Component)
│   │   ├── FilterBar.tsx       # 필터 바 (Client Component)
│   │   └── RefreshButton.tsx   # 새로고침 (Client Component)
│   ├── content/
│   │   └── ...
│   └── actions.ts              # Server Actions
```

#### 2. 인증 미들웨어

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const session = request.cookies.get('session');

  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!session) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
```

#### 3. 성능 최적화

- **Streaming**: `loading.tsx` 파일로 즉각적인 피드백
- **Suspense Boundaries**: 느린 데이터 페칭 격리
- **Partial Prerendering (PPR)**: Next.js 16의 실험적 기능 활용 고려

```typescript
// app/admin/submissions/page.tsx
import { Suspense } from 'react';
import { SubmissionTable } from './SubmissionTable';
import { SubmissionTableSkeleton } from './SubmissionTableSkeleton';

export default function Page() {
  return (
    <div>
      <h1>상담 신청 관리</h1>
      <Suspense fallback={<SubmissionTableSkeleton />}>
        <SubmissionTable />
      </Suspense>
    </div>
  );
}
```

#### 4. 에러 핸들링

```typescript
// app/admin/submissions/error.tsx
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <h2>문제가 발생했습니다</h2>
      <p>{error.message}</p>
      <button onClick={reset}>다시 시도</button>
    </div>
  );
}
```

---

## 2. 콘텐츠 승인 워크플로우

### 결정 (Decision)

**데이터베이스 기반 상태 관리 + 이메일 알림 (Resend) + Webhook 확장성**

- 워크플로우 상태: Prisma 모델의 `status` 필드로 관리
- 알림: Resend를 통한 이메일 알림 (관리자에게만)
- 상태 전이: State Machine 패턴 적용
- 확장성: Webhook 엔드포인트로 외부 통합 가능

### 근거 (Rationale)

#### 2.1 상태 머신 설계

**상태 정의:**
```typescript
// prisma/schema.prisma
enum SubmissionStatus {
  PENDING       // 대기중 (초기 상태)
  UNDER_REVIEW  // 검토중 (관리자 확인 시작)
  APPROVED      // 승인됨
  REJECTED      // 거부됨
  PUBLISHED     // 게시됨 (승인 후 실제 노출)
  ARCHIVED      // 보관됨 (게시 종료)
}

model CounselingRequest {
  id            String            @id @default(cuid())
  status        SubmissionStatus  @default(PENDING)
  submittedAt   DateTime          @default(now())
  reviewedAt    DateTime?
  reviewedBy    String?
  publishedAt   DateTime?
  archivedAt    DateTime?
  adminNote     String?

  // 상담 신청 필드들
  name          String
  phone         String
  email         String?
  content       String

  // 감사 로그
  statusHistory StatusHistory[]

  @@index([status, submittedAt])
}

model StatusHistory {
  id              String            @id @default(cuid())
  requestId       String
  request         CounselingRequest @relation(fields: [requestId], references: [id])
  fromStatus      SubmissionStatus
  toStatus        SubmissionStatus
  changedBy       String
  changedAt       DateTime          @default(now())
  note            String?

  @@index([requestId, changedAt])
}
```

**상태 전이 규칙:**
```typescript
// lib/workflow/state-machine.ts
type StatusTransition = {
  from: SubmissionStatus[];
  to: SubmissionStatus;
  requiredRole: 'admin' | 'user';
  action: string;
};

const ALLOWED_TRANSITIONS: StatusTransition[] = [
  { from: ['PENDING'], to: 'UNDER_REVIEW', requiredRole: 'admin', action: 'start_review' },
  { from: ['PENDING', 'UNDER_REVIEW'], to: 'APPROVED', requiredRole: 'admin', action: 'approve' },
  { from: ['PENDING', 'UNDER_REVIEW'], to: 'REJECTED', requiredRole: 'admin', action: 'reject' },
  { from: ['APPROVED'], to: 'PUBLISHED', requiredRole: 'admin', action: 'publish' },
  { from: ['PUBLISHED'], to: 'ARCHIVED', requiredRole: 'admin', action: 'archive' },
  { from: ['REJECTED'], to: 'PENDING', requiredRole: 'admin', action: 'reopen' },
];

export class WorkflowStateMachine {
  canTransition(
    currentStatus: SubmissionStatus,
    targetStatus: SubmissionStatus,
    userRole: string
  ): boolean {
    const transition = ALLOWED_TRANSITIONS.find(
      (t) => t.from.includes(currentStatus) && t.to === targetStatus
    );

    if (!transition) return false;
    if (transition.requiredRole === 'admin' && userRole !== 'admin') return false;

    return true;
  }

  async transition(
    requestId: string,
    targetStatus: SubmissionStatus,
    userId: string,
    note?: string
  ) {
    const request = await prisma.counselingRequest.findUnique({
      where: { id: requestId },
    });

    if (!request) throw new Error('Request not found');

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!this.canTransition(request.status, targetStatus, user.role)) {
      throw new Error(
        `Invalid transition: ${request.status} -> ${targetStatus}`
      );
    }

    // 트랜잭션으로 상태 변경 + 히스토리 기록
    return await prisma.$transaction(async (tx) => {
      const updated = await tx.counselingRequest.update({
        where: { id: requestId },
        data: {
          status: targetStatus,
          reviewedAt: targetStatus === 'APPROVED' || targetStatus === 'REJECTED'
            ? new Date()
            : undefined,
          reviewedBy: targetStatus === 'APPROVED' || targetStatus === 'REJECTED'
            ? userId
            : undefined,
          publishedAt: targetStatus === 'PUBLISHED' ? new Date() : undefined,
          archivedAt: targetStatus === 'ARCHIVED' ? new Date() : undefined,
          adminNote: note,
        },
      });

      await tx.statusHistory.create({
        data: {
          requestId,
          fromStatus: request.status,
          toStatus: targetStatus,
          changedBy: userId,
          note,
        },
      });

      return updated;
    });
  }
}
```

#### 2.2 이메일 알림 전략 (Resend)

**선택 이유:**
- **개발자 경험**: 간단한 API, TypeScript 네이티브 지원
- **가격**: 월 100건 무료, 이후 $0.001/건 (월 예상 200-500건 기준 저렴)
- **신뢰성**: 99.9% SLA, AWS SES 기반
- **React Email**: JSX로 이메일 템플릿 작성 가능
- **한국어 지원**: UTF-8 완벽 지원

**구현:**
```typescript
// lib/notifications/email.ts
import { Resend } from 'resend';
import { CounselingApprovalEmail } from '@/emails/CounselingApprovalEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendAdminNotification(
  submission: CounselingRequest
) {
  const adminEmails = process.env.ADMIN_NOTIFICATION_EMAILS!.split(',');

  await resend.emails.send({
    from: 'DFP Connect <noreply@dfp-connect.org>',
    to: adminEmails,
    subject: `[긴급] 새로운 상담 신청: ${submission.name}`,
    react: CounselingApprovalEmail({ submission }),
  });
}

export async function sendApprovalNotification(
  submission: CounselingRequest,
  approved: boolean
) {
  if (!submission.email) return; // 이메일 없으면 스킵

  await resend.emails.send({
    from: 'DFP Connect <noreply@dfp-connect.org>',
    to: submission.email,
    subject: approved
      ? `[장애와가족플랫폼] 상담 신청이 승인되었습니다`
      : `[장애와가족플랫폼] 상담 신청 검토 결과`,
    react: approved
      ? ApprovedEmail({ submission })
      : RejectedEmail({ submission }),
  });
}
```

**React Email 템플릿:**
```typescript
// emails/CounselingApprovalEmail.tsx
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Button,
  Hr,
} from '@react-email/components';

export function CounselingApprovalEmail({ submission }) {
  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: '#f6f9fc', fontFamily: 'sans-serif' }}>
        <Container style={{ padding: '20px' }}>
          <Section style={{ backgroundColor: '#ffffff', padding: '30px' }}>
            <Text style={{ fontSize: '24px', fontWeight: 'bold' }}>
              새로운 상담 신청
            </Text>
            <Hr />
            <Text><strong>신청자:</strong> {submission.name}</Text>
            <Text><strong>연락처:</strong> {submission.phone}</Text>
            <Text><strong>이메일:</strong> {submission.email || '미제공'}</Text>
            <Text><strong>신청일시:</strong> {new Date(submission.submittedAt).toLocaleString('ko-KR')}</Text>
            <Hr />
            <Text style={{ whiteSpace: 'pre-wrap' }}>
              {submission.content}
            </Text>
            <Button
              href={`${process.env.NEXT_PUBLIC_APP_URL}/admin/submissions/${submission.id}`}
              style={{
                backgroundColor: '#007bff',
                color: '#ffffff',
                padding: '12px 24px',
                borderRadius: '5px',
                textDecoration: 'none',
              }}
            >
              관리자 페이지에서 확인
            </Button>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
```

#### 2.3 알림 전송 타이밍

**즉시 알림:**
- 새로운 상담 신청 제출 시 → 관리자에게 이메일
- 긴급돌봄 신청 시 → 관리자에게 SMS (Twilio/AWS SNS, 선택적)

**배치 알림 (선택적):**
- 매일 오전 9시: 전날 미처리 건 요약 이메일

```typescript
// app/api/cron/daily-summary/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendDailySummaryEmail } from '@/lib/notifications/email';

export async function GET(request: Request) {
  // Vercel Cron 또는 GCP Cloud Scheduler로 호출
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const pendingSubmissions = await prisma.counselingRequest.findMany({
    where: {
      status: 'PENDING',
      submittedAt: {
        lt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 24시간 이상 경과
      },
    },
  });

  if (pendingSubmissions.length > 0) {
    await sendDailySummaryEmail(pendingSubmissions);
  }

  return NextResponse.json({ sent: pendingSubmissions.length });
}
```

#### 2.4 Webhook 확장성

**미래 통합을 위한 Webhook 엔드포인트:**
- Slack/Discord 알림
- 외부 CRM 시스템 연동
- 분석 도구 통합

```typescript
// lib/webhooks/dispatcher.ts
export async function dispatchWebhook(
  event: 'submission.created' | 'submission.approved' | 'submission.rejected',
  payload: any
) {
  const webhookUrl = process.env.WEBHOOK_URL;
  if (!webhookUrl) return; // 웹훅 미설정 시 스킵

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Webhook-Secret': process.env.WEBHOOK_SECRET!,
      },
      body: JSON.stringify({
        event,
        timestamp: new Date().toISOString(),
        data: payload,
      }),
    });
  } catch (error) {
    console.error('Webhook dispatch failed:', error);
    // 실패해도 메인 로직은 계속 진행
  }
}
```

### 고려한 대안 (Alternatives Considered)

#### 대안 1: SendGrid

**장점:**
- 업계 표준, 성숙한 플랫폼
- 강력한 분석 대시보드
- 마케팅 이메일 기능

**단점:**
- 복잡한 API (Resend 대비)
- 가격: 월 100건 무료 후 $19.95/월부터 (더 비쌈)
- React Email 통합 불편

**거부 이유:** DFP Connect는 트랜잭션 이메일만 필요하며, Resend가 더 간단하고 저렴

#### 대안 2: 데이터베이스 Notification 테이블만 사용 (이메일 없음)

**장점:**
- 외부 의존성 제거
- 비용 절감

**단점:**
- 관리자가 대시보드를 지속적으로 확인해야 함
- 긴급 신청 놓칠 위험
- 사용자 경험 저하 (승인 결과 알림 없음)

**거부 이유:** 상담 신청은 시간에 민감하므로 적극적 알림 필요

#### 대안 3: Firebase Cloud Messaging / Push Notification

**장점:**
- 모바일 친화적
- 즉각적인 알림

**단점:**
- 관리자가 모바일 앱/PWA 설치 필요
- 구현 복잡도 증가
- 추가 인프라 (FCM 토큰 관리)

**거부 이유:** 관리자는 주로 데스크톱에서 작업, 이메일로 충분

### 구현 가이드 (Implementation Guide)

#### 1. Server Action에서 워크플로우 통합

```typescript
// app/admin/actions.ts
'use server';

import { WorkflowStateMachine } from '@/lib/workflow/state-machine';
import { sendApprovalNotification } from '@/lib/notifications/email';
import { dispatchWebhook } from '@/lib/webhooks/dispatcher';

const workflow = new WorkflowStateMachine();

export async function approveSubmission(formData: FormData) {
  const session = await auth();
  if (!session?.user?.isAdmin) throw new Error('Unauthorized');

  const id = formData.get('id') as string;
  const note = formData.get('note') as string;

  // 상태 전이
  const updated = await workflow.transition(
    id,
    'APPROVED',
    session.user.id,
    note
  );

  // 알림 전송 (백그라운드)
  sendApprovalNotification(updated, true).catch(console.error);
  dispatchWebhook('submission.approved', updated).catch(console.error);

  revalidatePath('/admin/submissions');
  return { success: true };
}
```

#### 2. 환경 변수 설정

```bash
# .env
RESEND_API_KEY=re_xxxxxxxxxxxxx
ADMIN_NOTIFICATION_EMAILS=admin1@dfp.org,admin2@dfp.org
WEBHOOK_URL=https://hooks.slack.com/services/xxx (선택적)
WEBHOOK_SECRET=random_secret_string
CRON_SECRET=another_random_secret
```

#### 3. 테스트 전략

```typescript
// __tests__/workflow.test.ts
import { WorkflowStateMachine } from '@/lib/workflow/state-machine';

describe('WorkflowStateMachine', () => {
  it('should allow PENDING -> APPROVED transition for admin', () => {
    const wf = new WorkflowStateMachine();
    expect(wf.canTransition('PENDING', 'APPROVED', 'admin')).toBe(true);
  });

  it('should reject PUBLISHED -> PENDING transition', () => {
    const wf = new WorkflowStateMachine();
    expect(wf.canTransition('PUBLISHED', 'PENDING', 'admin')).toBe(false);
  });
});
```

---

## 3. 이미지 최적화 및 CDN 전략

### 결정 (Decision)

**Google Cloud Storage + Next.js Image Optimization + WebP 자동 변환**

- 업로드: 클라이언트 → GCS (Signed URL)
- 저장: GCS 버킷 (공개 읽기, 비공개 쓰기)
- 전송: Next.js Image 컴포넌트 (자동 WebP 변환 + 리사이징)
- CDN: GCS 내장 CDN (Cloud CDN 선택적 활성화)
- 검증: 클라이언트 사이드 사전 검증 + 서버 사이드 최종 검증

### 근거 (Rationale)

#### 3.1 Google Cloud Storage 선택

**장점:**
- **GCP 통합**: Cloud Run과 동일 생태계, IAM 통합 인증
- **가격**: $0.020/GB/월 (Standard Storage), 첫 5GB 무료 (egress 제외)
- **성능**: 글로벌 멀티 리전 지원, 자동 리전 복제
- **내구성**: 99.999999999% (11 nine's) 데이터 내구성
- **CDN**: Cloud CDN 쉽게 활성화 가능

**비교: AWS S3**
- S3: $0.023/GB/월 (약간 더 비쌈)
- S3: CloudFront 별도 설정 필요
- GCS: 이미 GCP 사용 중이므로 통합 관리 용이

#### 3.2 업로드 전략: Signed URL

**보안 장점:**
- 클라이언트가 직접 GCS에 업로드 (서버 부하 감소)
- 임시 권한 (1시간 유효)으로 보안 강화
- 서버는 URL 생성만 담당

**구현:**
```typescript
// app/api/upload/signed-url/route.ts
import { NextResponse } from 'next/server';
import { Storage } from '@google-cloud/storage';
import { auth } from '@/lib/auth';

const storage = new Storage({
  projectId: process.env.GCP_PROJECT_ID,
  credentials: {
    client_email: process.env.GCS_CLIENT_EMAIL,
    private_key: process.env.GCS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
});

const bucket = storage.bucket(process.env.GCS_BUCKET_NAME!);

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const { filename, contentType } = await request.json();

  // 파일 확장자 검증
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  if (!allowedTypes.includes(contentType)) {
    return new NextResponse('Invalid file type', { status: 400 });
  }

  // 고유 파일명 생성
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(7);
  const sanitizedFilename = filename.replace(/[^a-zA-Z0-9.-]/g, '_');
  const gcsFilename = `uploads/${timestamp}-${randomString}-${sanitizedFilename}`;

  const file = bucket.file(gcsFilename);

  // Signed URL 생성 (1시간 유효, 업로드 전용)
  const [url] = await file.getSignedUrl({
    version: 'v4',
    action: 'write',
    expires: Date.now() + 60 * 60 * 1000, // 1시간
    contentType,
  });

  return NextResponse.json({
    uploadUrl: url,
    publicUrl: `https://storage.googleapis.com/${process.env.GCS_BUCKET_NAME}/${gcsFilename}`,
  });
}
```

**클라이언트 업로드:**
```typescript
// components/ImageUploader.tsx
'use client';

import { useState } from 'react';

export function ImageUploader({ onUploadComplete }) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (file: File) => {
    // 1. 클라이언트 사전 검증
    if (file.size > 5 * 1024 * 1024) {
      alert('파일 크기는 5MB 이하로 제한됩니다.');
      return;
    }

    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드 가능합니다.');
      return;
    }

    setUploading(true);

    try {
      // 2. Signed URL 요청
      const response = await fetch('/api/upload/signed-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filename: file.name,
          contentType: file.type,
        }),
      });

      const { uploadUrl, publicUrl } = await response.json();

      // 3. GCS에 직접 업로드
      await fetch(uploadUrl, {
        method: 'PUT',
        headers: { 'Content-Type': file.type },
        body: file,
      });

      // 4. 성공 콜백
      onUploadComplete(publicUrl);
    } catch (error) {
      console.error('Upload failed:', error);
      alert('업로드 실패. 다시 시도해주세요.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])}
        disabled={uploading}
      />
      {uploading && <p>업로드 중...</p>}
    </div>
  );
}
```

#### 3.3 Next.js Image 최적화

**자동 최적화 기능:**
- WebP/AVIF 자동 변환 (브라우저 지원 시)
- Lazy loading (뷰포트 진입 시 로드)
- 반응형 이미지 (srcset 자동 생성)
- 우선순위 로딩 (priority 속성)

**구현:**
```typescript
// components/OptimizedImage.tsx
import Image from 'next/image';

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      quality={85} // 기본 75에서 85로 상향 (품질 중시)
      placeholder="blur"
      blurDataURL="data:image/svg+xml;base64,..." // LQIP
    />
  );
}
```

**Next.js 설정:**
```typescript
// next.config.ts
import type { NextConfig } from 'next';

const config: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        pathname: `/${process.env.GCS_BUCKET_NAME}/**`,
      },
    ],
    formats: ['image/avif', 'image/webp'], // AVIF 우선, WebP fallback
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1년 캐싱
  },
};

export default config;
```

#### 3.4 이미지 검증 및 제한

**클라이언트 사이드 (사용자 경험):**
```typescript
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

function validateImage(file: File): string | null {
  if (file.size > MAX_FILE_SIZE) {
    return '파일 크기는 5MB 이하로 제한됩니다.';
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return '지원하는 형식: JPEG, PNG, WebP, GIF';
  }

  return null; // 통과
}
```

**서버 사이드 (보안):**
```typescript
// app/api/upload/verify/route.ts
import { NextResponse } from 'next/server';
import sharp from 'sharp';

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return new NextResponse('No file provided', { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  try {
    // sharp로 실제 이미지 파일인지 검증
    const metadata = await sharp(buffer).metadata();

    // 최대 해상도 제한 (예: 4K)
    if (metadata.width! > 3840 || metadata.height! > 2160) {
      return new NextResponse('Image resolution too high', { status: 400 });
    }

    // EXIF 정보 제거 (개인정보 보호)
    const processedBuffer = await sharp(buffer)
      .rotate() // EXIF orientation 적용
      .withMetadata({ orientation: undefined }) // EXIF 제거
      .toBuffer();

    return NextResponse.json({
      valid: true,
      width: metadata.width,
      height: metadata.height,
      format: metadata.format,
    });
  } catch (error) {
    return new NextResponse('Invalid image file', { status: 400 });
  }
}
```

#### 3.5 WebP 변환 전략

**Next.js Image가 자동 변환:**
- 사용자 업로드 시 원본 그대로 GCS 저장 (JPEG/PNG)
- Next.js Image 컴포넌트가 요청 시 자동으로 WebP/AVIF 변환
- 변환된 이미지는 `.next/cache/images`에 캐싱 (로컬) 및 GCS에 영구 캐싱 불필요

**수동 변환이 필요한 경우 (선택적):**
```typescript
// lib/image-processing.ts
import sharp from 'sharp';

export async function convertToWebP(buffer: Buffer): Promise<Buffer> {
  return await sharp(buffer)
    .webp({ quality: 85, effort: 6 }) // effort: 0-6 (높을수록 느리지만 파일 작음)
    .toBuffer();
}

// 업로드 시 자동 변환 후 저장 (선택적)
export async function uploadWithWebPConversion(file: File) {
  const buffer = Buffer.from(await file.arrayBuffer());
  const webpBuffer = await convertToWebP(buffer);

  // GCS에 WebP로 저장
  // ...
}
```

#### 3.6 CDN 전략

**Phase 1: GCS 기본 CDN (즉시 가능)**
- GCS는 기본적으로 글로벌 엣지 캐싱 제공
- 추가 설정 불필요
- 비용: egress 비용만 (첫 1GB 무료, 이후 $0.12/GB)

**Phase 2: Cloud CDN 활성화 (트래픽 증가 시)**
```bash
# GCS 버킷에 Cloud CDN 연결
gcloud compute backend-buckets create dfp-images-backend \
  --gcs-bucket-name=dfp-connect-images \
  --enable-cdn

gcloud compute url-maps create dfp-images-cdn \
  --default-backend-bucket=dfp-images-backend
```

**예상 비용 (월 트래픽 100GB 기준):**
- GCS egress only: $12
- Cloud CDN: $1-2 (캐시 히트율 90% 가정)

### 고려한 대안 (Alternatives Considered)

#### 대안 1: Cloudinary / Imgix (전문 이미지 CDN)

**장점:**
- 강력한 이미지 변환 API (리사이징, 필터, 워터마크 등)
- 자동 최적화 및 포맷 변환
- 사용하기 쉬운 대시보드

**단점:**
- 비용: Cloudinary 무료 플랜 25GB/월, 이후 $99/월부터
- 외부 의존성 증가
- Next.js Image 최적화와 기능 중복

**거부 이유:** Next.js Image + GCS 조합으로 충분, 비용 대비 효과 낮음

#### 대안 2: 서버 업로드 (멀티파트 폼)

**장점:**
- 구현 간단 (서버에서 직접 처리)
- 추가 보안 계층

**단점:**
- Cloud Run 인스턴스 부하 증가
- 업로드 중 타임아웃 위험 (큰 파일)
- 대역폭 비용 증가 (클라이언트 → Cloud Run → GCS)

**거부 이유:** Signed URL 방식이 더 확장 가능하고 효율적

#### 대안 3: Base64 인코딩 (DB 저장)

**장점:**
- 외부 스토리지 불필요
- 구현 매우 간단

**단점:**
- DB 크기 급증 (Base64는 원본 대비 33% 증가)
- 이미지 로딩 성능 저하 (DB 쿼리 필요)
- CDN 활용 불가
- 백업 비용 증가

**거부 이유:** 비현실적, 이미지는 객체 스토리지가 표준

### 구현 가이드 (Implementation Guide)

#### 1. GCS 버킷 설정

```bash
# 버킷 생성 (서울 리전)
gsutil mb -c STANDARD -l asia-northeast3 gs://dfp-connect-images

# 공개 읽기 권한 설정
gsutil iam ch allUsers:objectViewer gs://dfp-connect-images

# CORS 설정 (클라이언트 직접 업로드용)
cat > cors.json << EOF
[
  {
    "origin": ["https://dfp-connect.org", "http://localhost:3000"],
    "method": ["GET", "PUT"],
    "responseHeader": ["Content-Type"],
    "maxAgeSeconds": 3600
  }
]
EOF

gsutil cors set cors.json gs://dfp-connect-images

# 수명주기 정책 (임시 업로드 파일 자동 삭제)
cat > lifecycle.json << EOF
{
  "lifecycle": {
    "rule": [
      {
        "action": {"type": "Delete"},
        "condition": {
          "age": 90,
          "matchesPrefix": ["uploads/temp/"]
        }
      }
    ]
  }
}
EOF

gsutil lifecycle set lifecycle.json gs://dfp-connect-images
```

#### 2. 환경 변수

```bash
# .env
GCP_PROJECT_ID=dfp-connect-prod
GCS_BUCKET_NAME=dfp-connect-images
GCS_CLIENT_EMAIL=service-account@dfp-connect-prod.iam.gserviceaccount.com
GCS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

#### 3. 패키지 설치

```bash
npm install @google-cloud/storage sharp
npm install -D @types/node
```

#### 4. 보안 체크리스트

- [ ] GCS IAM: 서비스 계정에 최소 권한 부여 (`roles/storage.objectAdmin`)
- [ ] Signed URL 유효 시간 제한 (1시간)
- [ ] 파일 타입 검증 (클라이언트 + 서버)
- [ ] 파일 크기 제한 (5MB)
- [ ] EXIF 정보 제거 (개인정보 보호)
- [ ] Rate limiting (업로드 API)

---

## 4. 검색 및 필터링 구현

### 결정 (Decision)

**Prisma Full-Text Search (PostgreSQL) + 클라이언트 필터링 하이브리드**

- 텍스트 검색: PostgreSQL Full-Text Search (한국어 지원 via `pg_trgm`)
- 카테고리 필터: 서버 사이드 쿼리 (Prisma WHERE 절)
- 정렬: 서버 사이드 (Prisma ORDER BY)
- 페이지네이션: 커서 기반 페이지네이션 (무한 스크롤) 또는 오프셋 기반 (번호 페이지)
- 실시간 검색: Debounced 입력 + Server Component 재검증

### 근거 (Rationale)

#### 4.1 PostgreSQL Full-Text Search

**선택 이유:**
- **통합성**: 이미 PostgreSQL 사용 중, 추가 인프라 불필요
- **성능**: GIN 인덱스로 빠른 검색 (100-500 동시 사용자 충분)
- **한국어 지원**: `pg_trgm` 확장으로 trigram 기반 검색 (형태소 분석 불필요)
- **비용**: 무료 (DB 리소스만 사용)

**한국어 검색 최적화:**
```sql
-- PostgreSQL 확장 활성화
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Trigram 인덱스 생성 (유사도 검색)
CREATE INDEX idx_content_title_trgm ON content USING GIN (title gin_trgm_ops);
CREATE INDEX idx_content_body_trgm ON content USING GIN (body gin_trgm_ops);

-- Full-Text Search 인덱스 (영어/숫자 키워드)
CREATE INDEX idx_content_title_fts ON content USING GIN (to_tsvector('simple', title));
```

**Prisma 스키마:**
```prisma
// prisma/schema.prisma
model Content {
  id          String   @id @default(cuid())
  title       String
  body        String   @db.Text
  category    Category
  status      Status
  publishedAt DateTime?
  createdAt   DateTime @default(now())

  @@index([category, status, publishedAt])
  @@index([title(ops: raw("gin_trgm_ops"))], type: Gin)
  @@index([body(ops: raw("gin_trgm_ops"))], type: Gin)
}
```

**검색 쿼리:**
```typescript
// lib/search.ts
import { prisma } from '@/lib/prisma';

export async function searchContent({
  query,
  category,
  status = 'PUBLISHED',
  page = 1,
  limit = 20,
}: {
  query?: string;
  category?: string;
  status?: string;
  page?: number;
  limit?: number;
}) {
  const where = {
    status,
    ...(category && { category }),
    ...(query && {
      OR: [
        {
          title: {
            search: query, // PostgreSQL Full-Text Search
          },
        },
        {
          body: {
            search: query,
          },
        },
      ],
    }),
  };

  const [results, total] = await Promise.all([
    prisma.content.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { publishedAt: 'desc' },
    }),
    prisma.content.count({ where }),
  ]);

  return {
    results,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
}
```

**한국어 유사도 검색 (pg_trgm):**
```typescript
// 정확한 매치 없을 때 유사도 검색 fallback
export async function similaritySearch(query: string) {
  return await prisma.$queryRaw`
    SELECT id, title, body,
           similarity(title, ${query}) AS title_sim,
           similarity(body, ${query}) AS body_sim
    FROM content
    WHERE similarity(title, ${query}) > 0.3
       OR similarity(body, ${query}) > 0.2
    ORDER BY GREATEST(
      similarity(title, ${query}),
      similarity(body, ${query})
    ) DESC
    LIMIT 10
  `;
}
```

#### 4.2 페이지네이션 전략

**오프셋 기반 (번호 페이지):**
```typescript
// app/content/page.tsx (Server Component)
export default async function ContentListPage({
  searchParams,
}: {
  searchParams: { q?: string; category?: string; page?: string };
}) {
  const page = parseInt(searchParams.page || '1');
  const query = searchParams.q;
  const category = searchParams.category;

  const { results, total, totalPages } = await searchContent({
    query,
    category,
    page,
    limit: 20,
  });

  return (
    <div>
      <SearchBar defaultQuery={query} defaultCategory={category} />
      <ContentGrid items={results} />
      <Pagination currentPage={page} totalPages={totalPages} />
    </div>
  );
}
```

**커서 기반 (무한 스크롤, 선택적):**
```typescript
// 무한 스크롤용 API
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cursor = searchParams.get('cursor');
  const limit = 20;

  const results = await prisma.content.findMany({
    take: limit + 1, // 다음 페이지 존재 여부 확인
    ...(cursor && { cursor: { id: cursor }, skip: 1 }),
    orderBy: { publishedAt: 'desc' },
  });

  const hasMore = results.length > limit;
  const items = hasMore ? results.slice(0, -1) : results;
  const nextCursor = hasMore ? items[items.length - 1].id : null;

  return NextResponse.json({
    items,
    nextCursor,
    hasMore,
  });
}
```

#### 4.3 실시간 검색 (Debounced)

```typescript
// components/SearchBar.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');

  const debouncedSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set('q', value);
    } else {
      params.delete('q');
    }
    params.set('page', '1'); // 검색 시 첫 페이지로 리셋
    router.push(`/content?${params.toString()}`);
  }, 500); // 500ms 딜레이

  useEffect(() => {
    debouncedSearch(query);
  }, [query, debouncedSearch]);

  return (
    <input
      type="search"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="검색어를 입력하세요"
      className="border p-2 rounded"
    />
  );
}
```

#### 4.4 필터 및 정렬 UI

```typescript
// components/FilterBar.tsx
'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    params.set('page', '1');
    router.push(`/content?${params.toString()}`);
  };

  return (
    <div className="flex gap-4">
      <select
        value={searchParams.get('category') || 'all'}
        onChange={(e) => updateFilter('category', e.target.value)}
      >
        <option value="all">전체 카테고리</option>
        <option value="notice">공지사항</option>
        <option value="news">새소식</option>
        <option value="story">가족 이야기</option>
      </select>

      <select
        value={searchParams.get('sort') || 'latest'}
        onChange={(e) => updateFilter('sort', e.target.value)}
      >
        <option value="latest">최신순</option>
        <option value="oldest">오래된순</option>
        <option value="popular">인기순</option>
      </select>
    </div>
  );
}
```

#### 4.5 성능 최적화

**1. 인덱스 전략:**
```sql
-- 복합 인덱스 (자주 함께 사용되는 필터)
CREATE INDEX idx_content_category_status_published
ON content (category, status, published_at DESC);

-- 부분 인덱스 (게시된 콘텐츠만)
CREATE INDEX idx_content_published
ON content (published_at DESC)
WHERE status = 'PUBLISHED';
```

**2. 쿼리 최적화:**
```typescript
// 불필요한 필드 제외 (select)
const results = await prisma.content.findMany({
  where,
  select: {
    id: true,
    title: true,
    excerpt: true, // body 대신 요약
    category: true,
    publishedAt: true,
    // body 제외 (상세 페이지에서만 로드)
  },
  take: limit,
});
```

**3. 캐싱:**
```typescript
// Next.js 캐싱 (Server Component)
export const revalidate = 60; // 60초마다 재검증

// 또는 fetch cache
const results = await fetch('https://api.dfp.org/content', {
  next: { revalidate: 60 },
});
```

### 고려한 대안 (Alternatives Considered)

#### 대안 1: Algolia / Meilisearch (전문 검색 엔진)

**장점:**
- 타이포 허용 (fuzzy search)
- 실시간 검색 UI 최적화
- 패싯 검색 (다중 필터)
- 한국어 형태소 분석

**단점:**
- Algolia: 월 $1/1000 검색, 무료 플랜 10K 검색/월 (초과 시 비용)
- 추가 인프라 (데이터 동기화)
- 구현 복잡도 증가

**거부 이유:**
- DFP Connect의 검색 빈도는 낮음 (주로 브라우징)
- 콘텐츠 양이 적음 (예상 1000-5000 건)
- PostgreSQL로 충분히 빠른 검색 가능

#### 대안 2: Elasticsearch

**장점:**
- 강력한 검색 기능
- 대규모 데이터 처리
- 분산 아키텍처

**단점:**
- 운영 복잡도 매우 높음
- GCP Elasticsearch Service (Elastic Cloud) 비용 높음 (월 $50+)
- 오버엔지니어링

**거부 이유:** 100-500 동시 사용자 규모에 과도한 솔루션

#### 대안 3: 클라이언트 사이드 검색 (JavaScript)

**장점:**
- 즉각적인 반응성
- 서버 부하 없음

**단점:**
- 전체 데이터를 클라이언트에 로드해야 함 (초기 로딩 느림)
- 대량 데이터 불가능 (콘텐츠 1000건 이상 시 비현실적)
- SEO 불리

**거부 이유:** 서버 사이드 검색이 더 확장 가능

### 구현 가이드 (Implementation Guide)

#### 1. PostgreSQL 확장 활성화

```sql
-- Supabase/Managed PostgreSQL에서 실행
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE EXTENSION IF NOT EXISTS unaccent; -- 악센트 제거 (선택적)

-- 테스트 쿼리
SELECT show_trgm('장애인가족');
-- 결과: {  j,가족, ja, jang,애인,인가, ...}
```

#### 2. Prisma 마이그레이션

```bash
# 스키마 수정 후
npx prisma migrate dev --name add_search_indexes

# 프로덕션 배포
npx prisma migrate deploy
```

#### 3. 검색 성능 테스트

```typescript
// __tests__/search.test.ts
import { searchContent } from '@/lib/search';

describe('Search Performance', () => {
  it('should return results within 100ms', async () => {
    const start = Date.now();
    await searchContent({ query: '상담', limit: 20 });
    const duration = Date.now() - start;
    expect(duration).toBeLessThan(100);
  });
});
```

#### 4. 모니터링 쿼리

```sql
-- 느린 쿼리 확인
SELECT query, mean_exec_time, calls
FROM pg_stat_statements
WHERE query LIKE '%content%'
ORDER BY mean_exec_time DESC
LIMIT 10;

-- 인덱스 사용률 확인
SELECT schemaname, tablename, indexname, idx_scan
FROM pg_stat_user_indexes
WHERE tablename = 'content'
ORDER BY idx_scan DESC;
```

---

## 5. 폼 스팸 방지

### 결정 (Decision)

**Cloudflare Turnstile + Honeypot + Rate Limiting 조합**

- Primary: Cloudflare Turnstile (CAPTCHA 대체)
- Secondary: Honeypot 필드 (봇 필터링)
- Tertiary: IP 기반 Rate Limiting (DDoS 방지)
- 사용자 경험: 일반 사용자는 클릭 한 번 또는 자동 통과

### 근거 (Rationale)

#### 5.1 Cloudflare Turnstile 선택

**reCAPTCHA v3 대비 장점:**
- **완전 무료**: 무제한 요청, 숨겨진 비용 없음
- **프라이버시**: Google 추적 없음 (GDPR/개인정보보호법 준수)
- **더 나은 UX**: "I'm not a robot" 체크박스 대신 자동 검증 또는 간단한 챌린지
- **한국어 완벽 지원**: UI 한국어 자동 감지
- **접근성**: 스크린 리더 지원, WCAG 2.1 AA 준수

**reCAPTCHA v3 문제점:**
- 점수 기반 (0.0-1.0)으로 임계값 설정 어려움
- 백그라운드 추적으로 프라이버시 우려
- Google 의존성

**구현:**
```typescript
// app/contact/page.tsx
import { TurnstileWidget } from '@/components/TurnstileWidget';

export default function ContactPage() {
  return (
    <form action="/api/contact" method="POST">
      <input type="text" name="name" required />
      <input type="email" name="email" required />
      <textarea name="message" required />

      {/* Turnstile 위젯 */}
      <TurnstileWidget />

      <button type="submit">전송</button>
    </form>
  );
}
```

```typescript
// components/TurnstileWidget.tsx
'use client';

import Script from 'next/script';

export function TurnstileWidget() {
  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="lazyOnload"
      />
      <div
        className="cf-turnstile"
        data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
        data-theme="light"
        data-language="ko"
      />
    </>
  );
}
```

**서버 검증:**
```typescript
// app/api/contact/route.ts
import { NextResponse } from 'next/server';

async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const response = await fetch(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret: process.env.TURNSTILE_SECRET_KEY,
        response: token,
        remoteip: ip,
      }),
    }
  );

  const data = await response.json();
  return data.success;
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const turnstileToken = formData.get('cf-turnstile-response');

  if (!turnstileToken) {
    return new NextResponse('Missing CAPTCHA', { status: 400 });
  }

  // IP 주소 추출
  const ip = request.headers.get('x-forwarded-for') ||
             request.headers.get('x-real-ip') ||
             'unknown';

  const verified = await verifyTurnstile(turnstileToken as string, ip);

  if (!verified) {
    return new NextResponse('CAPTCHA verification failed', { status: 403 });
  }

  // 폼 처리 계속...
  // ...
}
```

#### 5.2 Honeypot 필드

**원리:**
- 일반 사용자에게는 보이지 않는 필드
- 봇이 자동으로 모든 필드를 채우면 감지

**구현:**
```typescript
// components/ContactForm.tsx
export function ContactForm() {
  return (
    <form action="/api/contact" method="POST">
      {/* 실제 필드들 */}
      <input type="text" name="name" required />
      <input type="email" name="email" required />

      {/* Honeypot (CSS로 숨김) */}
      <input
        type="text"
        name="website" // 봇이 채울 법한 이름
        autoComplete="off"
        tabIndex={-1}
        style={{
          position: 'absolute',
          left: '-9999px',
          width: '1px',
          height: '1px',
          opacity: 0,
        }}
        aria-hidden="true"
      />

      <button type="submit">전송</button>
    </form>
  );
}
```

**서버 검증:**
```typescript
export async function POST(request: Request) {
  const formData = await request.formData();
  const honeypot = formData.get('website');

  // Honeypot 필드가 채워져 있으면 봇으로 판단
  if (honeypot) {
    console.warn('Honeypot triggered:', { ip: request.headers.get('x-forwarded-for') });
    // 200 OK 반환 (봇에게 성공한 것처럼 보이게)
    return new NextResponse('Success', { status: 200 });
  }

  // 실제 처리...
}
```

#### 5.3 Rate Limiting

**전략:**
- IP 기반: 동일 IP에서 1분당 5회, 1시간당 20회
- 이메일 기반: 동일 이메일로 1시간당 3회
- 전역: 전체 시스템 1분당 100회 (DDoS 방어)

**Upstash Redis 활용:**
```typescript
// lib/rate-limit.ts
import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';

const redis = Redis.fromEnv();

export const rateLimitByIP = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '1 m'), // 1분당 5회
  analytics: true,
  prefix: 'ratelimit:ip',
});

export const rateLimitByEmail = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, '1 h'), // 1시간당 3회
  analytics: true,
  prefix: 'ratelimit:email',
});
```

**적용:**
```typescript
// app/api/contact/route.ts
import { rateLimitByIP, rateLimitByEmail } from '@/lib/rate-limit';

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown';

  // IP 기반 Rate Limit
  const { success: ipAllowed, remaining, reset } = await rateLimitByIP.limit(ip);

  if (!ipAllowed) {
    return new NextResponse(
      JSON.stringify({
        error: '너무 많은 요청이 발생했습니다. 잠시 후 다시 시도해주세요.',
        retryAfter: new Date(reset).toISOString(),
      }),
      {
        status: 429,
        headers: {
          'Retry-After': String(Math.ceil((reset - Date.now()) / 1000)),
          'X-RateLimit-Remaining': String(remaining),
        },
      }
    );
  }

  const formData = await request.formData();
  const email = formData.get('email') as string;

  // 이메일 기반 Rate Limit
  const { success: emailAllowed } = await rateLimitByEmail.limit(email);

  if (!emailAllowed) {
    return new NextResponse(
      '이 이메일로 너무 많은 요청이 발생했습니다.',
      { status: 429 }
    );
  }

  // 폼 처리...
}
```

**대안: Vercel Edge Config (간단한 경우):**
```typescript
// middleware.ts
import { next } from '@vercel/edge';
import { rateLimitByIP } from '@/lib/edge-rate-limit';

export async function middleware(request: Request) {
  if (request.url.includes('/api/contact')) {
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const allowed = await rateLimitByIP(ip);

    if (!allowed) {
      return new Response('Too Many Requests', { status: 429 });
    }
  }

  return next();
}
```

#### 5.4 추가 보안 조치

**1. CSRF 토큰 (Server Actions 자동 보호):**
```typescript
// Server Actions는 Next.js가 자동으로 CSRF 보호
'use server';

export async function submitContact(formData: FormData) {
  // CSRF 토큰 자동 검증됨
}
```

**2. 이메일 인증 (선택적):**
```typescript
// 이메일 주소 실존 여부 확인
import dns from 'dns/promises';

async function verifyEmailDomain(email: string): Promise<boolean> {
  const domain = email.split('@')[1];
  try {
    const records = await dns.resolveMx(domain);
    return records.length > 0;
  } catch {
    return false;
  }
}
```

**3. 시간 기반 검증:**
```typescript
// 폼 로드 후 즉시 제출 방지 (봇 특성)
export function ContactForm() {
  const [formLoadTime] = useState(Date.now());

  const handleSubmit = async (formData: FormData) => {
    const timeTaken = Date.now() - formLoadTime;

    if (timeTaken < 3000) { // 3초 미만 제출 시 의심
      console.warn('Form submitted too quickly');
      // 추가 검증 또는 CAPTCHA 강제
    }

    // 제출...
  };
}
```

### 고려한 대안 (Alternatives Considered)

#### 대안 1: reCAPTCHA v3

**장점:**
- 업계 표준
- 강력한 봇 탐지

**단점:**
- Google 의존성 및 추적
- 프라이버시 우려 (GDPR 이슈)
- 점수 기반으로 임계값 설정 어려움
- 무료 플랜 제한 (월 1백만 건)

**거부 이유:** Turnstile이 더 프라이버시 친화적이고 무료

#### 대안 2: hCaptcha

**장점:**
- reCAPTCHA 대안
- 프라이버시 중시
- 접근성 좋음

**단점:**
- 무료 플랜 제한 (월 1000 건)
- Turnstile 대비 복잡한 챌린지 (사용자 경험 저하)

**거부 이유:** Turnstile이 더 간단하고 무제한 무료

#### 대안 3: IP Blacklist/Whitelist

**장점:**
- 간단한 구현

**단점:**
- VPN/프록시로 우회 쉬움
- 정상 사용자 오탐 가능 (공유 IP)
- 유지보수 부담 (블랙리스트 업데이트)

**거부 이유:** 다층 방어 중 하나로만 활용 (주 전략 아님)

### 구현 가이드 (Implementation Guide)

#### 1. Cloudflare Turnstile 설정

```bash
# 1. Cloudflare 계정 생성 및 로그인
# 2. Turnstile 페이지에서 사이트 추가
# 3. Site Key와 Secret Key 발급

# .env
NEXT_PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA
TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA
```

#### 2. Upstash Redis 설정 (Rate Limiting)

```bash
# 1. Upstash 계정 생성
# 2. Redis 데이터베이스 생성 (서울 리전)
# 3. 환경 변수 복사

# .env
UPSTASH_REDIS_REST_URL=https://xxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=AXXXxxxx

# 패키지 설치
npm install @upstash/redis @upstash/ratelimit
```

#### 3. 테스트

```typescript
// __tests__/spam-prevention.test.ts
import { POST } from '@/app/api/contact/route';

describe('Spam Prevention', () => {
  it('should reject submission without Turnstile token', async () => {
    const formData = new FormData();
    formData.set('name', 'Test');
    formData.set('email', 'test@test.com');

    const request = new Request('http://localhost/api/contact', {
      method: 'POST',
      body: formData,
    });

    const response = await POST(request);
    expect(response.status).toBe(400);
  });

  it('should reject submission if honeypot is filled', async () => {
    const formData = new FormData();
    formData.set('name', 'Test');
    formData.set('website', 'http://spam.com'); // Honeypot

    const request = new Request('http://localhost/api/contact', {
      method: 'POST',
      body: formData,
    });

    const response = await POST(request);
    expect(response.status).toBe(200); // 봇에게 성공처럼 보이게
  });
});
```

#### 4. 모니터링

```typescript
// lib/monitoring.ts
export function logSpamAttempt(type: 'honeypot' | 'ratelimit' | 'turnstile', data: any) {
  console.warn(`[SPAM] ${type}:`, {
    timestamp: new Date().toISOString(),
    ip: data.ip,
    userAgent: data.userAgent,
    ...data,
  });

  // Sentry로 전송 (선택적)
  if (process.env.NODE_ENV === 'production') {
    // Sentry.captureMessage(`Spam attempt: ${type}`, 'warning');
  }
}
```

---

## 6. 성능 모니터링 및 에러 추적

### 결정 (Decision)

**Google Analytics 4 + Sentry + GCP Cloud Monitoring 조합**

- 사용자 분석: Google Analytics 4 (무료, 기본 분석)
- 에러 추적: Sentry (무료 플랜 5K 이벤트/월)
- 인프라 모니터링: GCP Cloud Monitoring + Cloud Logging (GCP 통합)
- 성능 메트릭: Next.js Analytics (Vercel 배포 시) 또는 Web Vitals (GA4)

### 근거 (Rationale)

#### 6.1 Google Analytics 4

**선택 이유:**
- **무료**: 무제한 이벤트, 표준 보고서
- **친숙함**: 대부분의 마케팅 팀이 익숙
- **통합성**: Google Ads, Search Console 연동
- **한국 사용자 분석**: 인구통계, 관심사, 행동 패턴

**구현 (Next.js App Router):**
```typescript
// app/layout.tsx
import Script from 'next/script';

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
              page_path: window.location.pathname,
              anonymize_ip: true, // GDPR 준수
            });
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}
```

**사용자 정의 이벤트:**
```typescript
// lib/analytics.ts
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

// 페이지뷰 추적
export const pageview = (url: string) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// 이벤트 추적
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};
```

**주요 추적 이벤트:**
```typescript
// 상담 신청 제출
event({
  action: 'submit',
  category: 'counseling_request',
  label: 'family_counseling',
});

// 후원 버튼 클릭
event({
  action: 'click',
  category: 'donation',
  label: 'header_button',
});

// 파일 다운로드
event({
  action: 'download',
  category: 'resource',
  label: 'brochure_2025.pdf',
});
```

**Web Vitals 추적:**
```typescript
// app/layout.tsx
'use client';

import { useEffect } from 'react';
import { useReportWebVitals } from 'next/web-vitals';

export function WebVitals() {
  useReportWebVitals((metric) => {
    // GA4로 전송
    event({
      action: metric.name,
      category: 'Web Vitals',
      label: metric.id,
      value: Math.round(
        metric.name === 'CLS' ? metric.value * 1000 : metric.value
      ),
    });
  });

  return null;
}
```

#### 6.2 Sentry (에러 추적)

**선택 이유:**
- **무료 플랜**: 5,000 이벤트/월 (DFP 규모 충분)
- **Next.js 네이티브 지원**: 공식 SDK, 자동 소스맵 업로드
- **컨텍스트 정보**: 사용자 세션, 브레드크럼, 환경 변수
- **성능 모니터링**: Transaction 추적, 느린 쿼리 감지
- **알림**: Slack, 이메일, Discord 통합

**설치 및 설정:**
```bash
npx @sentry/wizard@latest -i nextjs
```

**자동 생성된 설정:**
```typescript
// sentry.client.config.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0, // 개발: 100%, 프로덕션: 0.1 (10%)
  debug: false,
  replaysOnErrorSampleRate: 1.0, // 에러 발생 시 세션 리플레이
  replaysSessionSampleRate: 0.1, // 일반 세션 10% 리플레이
  integrations: [
    new Sentry.BrowserTracing({
      tracePropagationTargets: ['localhost', /^https:\/\/dfp-connect\.org/],
    }),
    new Sentry.Replay({
      maskAllText: true, // 개인정보 마스킹
      blockAllMedia: true,
    }),
  ],
  beforeSend(event, hint) {
    // 개인정보 필터링
    if (event.request?.data) {
      const data = event.request.data;
      if (typeof data === 'object') {
        delete data.password;
        delete data.email;
        delete data.phone;
      }
    }
    return event;
  },
});
```

**서버 사이드 에러 추적:**
```typescript
// sentry.server.config.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.1, // 프로덕션에서 10%만 추적 (비용 절감)
  debug: false,
});
```

**수동 에러 리포팅:**
```typescript
// app/api/contact/route.ts
import * as Sentry from '@sentry/nextjs';

export async function POST(request: Request) {
  try {
    // 폼 처리...
  } catch (error) {
    Sentry.captureException(error, {
      tags: {
        section: 'contact_form',
      },
      extra: {
        requestUrl: request.url,
        userAgent: request.headers.get('user-agent'),
      },
    });

    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
```

**성능 추적:**
```typescript
// lib/db.ts
import * as Sentry from '@sentry/nextjs';
import { prisma } from './prisma';

export async function getContentList() {
  const transaction = Sentry.startTransaction({
    op: 'db.query',
    name: 'Get Content List',
  });

  try {
    const result = await prisma.content.findMany({
      take: 20,
      orderBy: { publishedAt: 'desc' },
    });

    transaction.setStatus('ok');
    return result;
  } catch (error) {
    transaction.setStatus('internal_error');
    throw error;
  } finally {
    transaction.finish();
  }
}
```

#### 6.3 GCP Cloud Monitoring

**Cloud Run 메트릭:**
- Request count
- Request latency (p50, p95, p99)
- Container CPU/Memory 사용률
- Instance count (auto-scaling)
- Error rate (5xx)

**자동 수집 (추가 설정 불필요):**
```bash
# Cloud Console에서 확인
# Monitoring > Dashboards > Cloud Run
```

**커스텀 메트릭 (선택적):**
```typescript
// lib/monitoring.ts
import { MetricServiceClient } from '@google-cloud/monitoring';

const client = new MetricServiceClient();

export async function recordCustomMetric(
  metricType: string,
  value: number
) {
  const projectId = process.env.GCP_PROJECT_ID;
  const projectName = client.projectPath(projectId);

  const dataPoint = {
    interval: {
      endTime: {
        seconds: Date.now() / 1000,
      },
    },
    value: {
      doubleValue: value,
    },
  };

  const timeSeries = {
    metric: {
      type: `custom.googleapis.com/${metricType}`,
    },
    resource: {
      type: 'cloud_run_revision',
      labels: {
        project_id: projectId,
        service_name: 'dfp-connect',
      },
    },
    points: [dataPoint],
  };

  await client.createTimeSeries({
    name: projectName,
    timeSeries: [timeSeries],
  });
}

// 사용 예시
recordCustomMetric('counseling_requests/count', 1);
```

**Cloud Logging 통합:**
```typescript
// lib/logger.ts
import { Logging } from '@google-cloud/logging';

const logging = new Logging();
const log = logging.log('dfp-connect');

export function logInfo(message: string, metadata?: any) {
  const entry = log.entry(
    {
      resource: { type: 'cloud_run_revision' },
      severity: 'INFO',
    },
    {
      message,
      ...metadata,
    }
  );

  log.write(entry);
}

export function logError(error: Error, metadata?: any) {
  const entry = log.entry(
    {
      resource: { type: 'cloud_run_revision' },
      severity: 'ERROR',
    },
    {
      message: error.message,
      stack: error.stack,
      ...metadata,
    }
  );

  log.write(entry);
}
```

**알림 설정 (Cloud Monitoring):**
```yaml
# alerting-policy.yaml
displayName: "High Error Rate"
conditions:
  - displayName: "Error rate > 5%"
    conditionThreshold:
      filter: |
        resource.type="cloud_run_revision"
        AND metric.type="run.googleapis.com/request_count"
        AND metric.label.response_code_class="5xx"
      comparison: COMPARISON_GT
      thresholdValue: 0.05
      duration: 60s
notificationChannels:
  - projects/dfp-connect-prod/notificationChannels/email-admin
```

#### 6.4 성능 벤치마크 목표

**Core Web Vitals (Google 권장):**
- LCP (Largest Contentful Paint): < 2.5s ✅
- FID (First Input Delay): < 100ms ✅
- CLS (Cumulative Layout Shift): < 0.1 ✅

**DFP Connect 목표:**
- TTFB (Time to First Byte): < 500ms
- FCP (First Contentful Paint): < 1.5s
- TTI (Time to Interactive): < 3.5s
- API Response Time: < 200ms (p95)

**Lighthouse 점수 목표:**
- Performance: > 90
- Accessibility: 100 (WCAG 2.1 AA 필수)
- Best Practices: > 90
- SEO: > 90

### 고려한 대안 (Alternatives Considered)

#### 대안 1: Vercel Analytics

**장점:**
- Next.js 네이티브 통합
- Real User Monitoring (RUM)
- Web Vitals 자동 추적
- 간단한 설정

**단점:**
- Vercel에서만 사용 가능 (GCP Cloud Run 불가)
- 무료 플랜 제한 (2,500 이벤트/월)
- 커스터마이징 제한

**거부 이유:** GCP Cloud Run 배포 예정으로 사용 불가

#### 대안 2: Datadog / New Relic

**장점:**
- 올인원 APM (Application Performance Monitoring)
- 강력한 대시보드
- 머신러닝 기반 이상 탐지

**단점:**
- 비용 매우 높음 (월 $15-31/호스트)
- 오버엔지니어링
- 러닝 커브 높음

**거부 이유:** 100-500 동시 사용자 규모에 과도, 비용 부담

#### 대안 3: LogRocket

**장점:**
- 세션 리플레이
- Redux/Context 상태 추적
- 강력한 디버깅 도구

**단점:**
- 비용 높음 (월 $99부터)
- Sentry + GA4 조합으로 충분

**거부 이유:** Sentry의 Session Replay로 대체 가능

### 구현 가이드 (Implementation Guide)

#### 1. 환경 변수 설정

```bash
# .env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx
SENTRY_AUTH_TOKEN=xxx (CI/CD용, 소스맵 업로드)
GCP_PROJECT_ID=dfp-connect-prod
```

#### 2. 대시보드 구성

**Google Analytics 4:**
- 맞춤 보고서: 상담 신청 전환율, 페이지별 이탈률
- 이벤트: 후원 버튼 클릭, 다운로드, 폼 제출
- 탐색: 사용자 여정 분석 (메인 → 서비스 → 신청)

**Sentry:**
- 프로젝트: dfp-connect-production
- 알림: Slack 채널 #dfp-alerts
- 릴리스: Git 태그 기반 자동 추적

**GCP Cloud Monitoring:**
- 대시보드: Cloud Run 메트릭 (CPU, 메모리, 레이턴시)
- 알림: 에러율 5% 초과 시 이메일
- Log Explorer: 상담 신청 로그 필터

#### 3. CI/CD 통합

```yaml
# .github/workflows/deploy.yml
- name: Upload Sentry source maps
  env:
    SENTRY_AUTH_TOKEN: ${{ secrets.SENTRY_AUTH_TOKEN }}
  run: |
    npm run build
    npx @sentry/cli sourcemaps upload \
      --org dfp-connect \
      --project dfp-connect-prod \
      .next/static
```

#### 4. 정기 리뷰

- **주간**: Sentry 에러 리뷰, 긴급 수정
- **월간**: GA4 트래픽 분석, Web Vitals 트렌드
- **분기**: 성능 최적화 계획, 인프라 스케일링 검토

---

## 부록: 기술 스택 요약

| 영역 | 기술 | 비고 |
|------|------|------|
| 프레임워크 | Next.js 16 (App Router) | React Server Components |
| 언어 | TypeScript 5.9 | 타입 안전성 |
| 데이터베이스 | PostgreSQL (프로덕션), SQLite (개발) | Prisma 6.18 ORM |
| 인증 | NextAuth.js v5 | OAuth + 이메일 로그인 |
| 이미지 저장 | Google Cloud Storage | CDN 내장 |
| 이미지 최적화 | Next.js Image | WebP/AVIF 자동 변환 |
| 검색 | PostgreSQL Full-Text + pg_trgm | 한국어 지원 |
| 스팸 방지 | Cloudflare Turnstile | 무료, 프라이버시 친화적 |
| Rate Limiting | Upstash Redis | Serverless Redis |
| 이메일 | Resend + React Email | 트랜잭션 이메일 |
| 분석 | Google Analytics 4 | 사용자 행동 분석 |
| 에러 추적 | Sentry | 무료 5K 이벤트/월 |
| 모니터링 | GCP Cloud Monitoring | Cloud Run 통합 |
| 배포 | GCP Cloud Run | Serverless 컨테이너 |
| CI/CD | GitHub Actions | 자동 배포 |

---

## 참고 자료

### Next.js 공식 문서
- [App Router](https://nextjs.org/docs/app)
- [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
- [Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)

### PostgreSQL
- [Full-Text Search](https://www.postgresql.org/docs/current/textsearch.html)
- [pg_trgm Extension](https://www.postgresql.org/docs/current/pgtrgm.html)

### Cloudflare
- [Turnstile Documentation](https://developers.cloudflare.com/turnstile/)

### Sentry
- [Next.js Integration](https://docs.sentry.io/platforms/javascript/guides/nextjs/)

### GCP
- [Cloud Run Documentation](https://cloud.google.com/run/docs)
- [Cloud Storage](https://cloud.google.com/storage/docs)
- [Cloud Monitoring](https://cloud.google.com/monitoring/docs)

---

**문서 버전**: 1.0
**마지막 업데이트**: 2025-11-18
**작성자**: Claude (Anthropic)
**검토 필요 사항**: 실제 트래픽 데이터 기반 최종 검증
