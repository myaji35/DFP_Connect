# 구현 계획: DFP Connect 기관 홍보 중심 웹사이트 구축

**브랜치**: `001-institutional-promotion` | **날짜**: 2025-11-18 | **스펙**: [spec.md](./spec.md)
**입력**: `specs/001-institutional-promotion/spec.md`의 기능 명세

## 요약

장애와가족플랫폼 사회적협동조합의 웹사이트를 기관 홍보 중심으로 전면 개편한다. 3개 핵심 페르소나(장애인 가족, 협력 기관, 후원 파트너)별 맞춤형 경험을 제공하는 6개 주요 페이지를 구축하고, 폼 제출 데이터를 관리하는 관리자 대시보드를 추가한다. 기존 Next.js 16 + Clerk + Prisma 스택을 활용하여 데이터베이스 스키마를 확장하고, 콘텐츠 승인 워크플로우를 구현한다.

## 기술적 맥락

**언어/버전**: TypeScript 5.9
**주요 의존성**:
- Next.js 16.0 (App Router)
- React 19.2
- Clerk 6.34 (인증)
- Prisma 6.18 (ORM)
- Tailwind CSS 4.1
- shadcn/ui (UI 컴포넌트)
- Zod 4.1 (검증)

**스토리지**:
- 개발: SQLite (prisma/dev.db)
- 프로덕션: Cloud SQL (PostgreSQL) - 기존 설정됨

**테스팅**:
- Unit: Jest (추가 필요)
- E2E: Playwright (추가 필요)
- Accessibility: axe-core (추가 필요)

**대상 플랫폼**:
- 웹 애플리케이션 (반응형)
- Google Cloud Run (asia-northeast3)
- Docker 컨테이너 기반 배포

**프로젝트 타입**: Next.js 웹 애플리케이션 (기존 프로젝트 확장)

**성능 목표**:
- 초기 로딩 시간 (LCP): < 3초
- First Input Delay: < 100ms
- 모바일 Lighthouse 점수: > 90

**제약사항**:
- WCAG 2.1 AA 준수 필수
- 99.9% 가용성 목표
- 한국어 우선 UI/UX
- Clerk 기반 인증 체계 유지
- 기존 데이터베이스 스키마와 호환

**규모/범위**:
- 6개 주요 페이지 신규 구축
- 관리자 대시보드 확장 (기존 admin/ 디렉토리 활용)
- 예상 동시 접속자: 100-500명
- 초기 콘텐츠: 약 20개 서비스, 10개 스토리

## 헌장 준수 검사

*GATE: Phase 0 연구 전 통과 필수. Phase 1 설계 후 재검증.*

### ✅ I. 페르소나 중심 설계
- 3개 페르소나(장애인 가족, 협력 기관, 후원 파트너) 명확히 구분
- 메인 랜딩 페이지에서 페르소나별 진입점 제공
- 각 페르소나별 전용 페이지 및 맞춤 콘텐츠 제공
- **준수**: spec.md의 User Story 1-7이 페르소나별로 명확히 분리됨

### ✅ II. 접근성 우선
- WCAG 2.1 AA 준수 (FR-010 Success Criteria SC-010)
- 키보드 내비게이션 지원 계획
- 스크린 리더 호환성 고려
- 색상 대비 충분히 확보 (SCREEN_DESIGN.md 참조)
- **준수**: 접근성 테스트 도구(axe-core) 도입 예정

### ✅ III. 보안 및 개인정보 보호
- Clerk 기반 인증 체계 유지
- 폼 제출 데이터 데이터베이스 암호화 저장 (Prisma)
- HTTPS 강제 (Cloud Run 기본 제공)
- 개인정보 최소 수집 (긴급돌봄 폼: 이름, 연락처, 상황만 요청)
- **준수**: 기존 보안 체계 확장

### ✅ IV. 성능 및 안정성
- LCP < 3초 목표 (SC-004)
- 이미지 최적화 (WebP, lazy loading)
- CDN 활용 (Cloud Run + Cloud CDN)
- 긴급돌봄 경로 최우선 최적화 (P1 user story)
- **준수**: 성능 테스트 계획 포함

### ✅ V. 테스트 기반 개발
- 핵심 플로우(긴급돌봄, 폼 제출) E2E 테스트 추가
- 단위 테스트: 폼 검증 로직, API 핸들러
- 통합 테스트: 페르소나별 주요 사용자 플로우
- CI/CD에 자동 테스트 통합 (GitHub Actions)
- **준수**: 테스트 전략 Phase 1에서 구체화

### ✅ VI. 한국어 우선 및 현지화
- 모든 UI 텍스트 한국어 제공
- Clerk 한국어 설정 유지 (@clerk/localizations)
- 날짜/시간 한국 표준 준수
- **준수**: spec.md 전체가 한국어 기반

### 🟡 기술 스택 표준
- ✅ Next.js 16+ (App Router) - 충족
- ✅ TypeScript 5.9+ - 충족
- ✅ Tailwind CSS 4.1+ - 충족 (v4.1.17)
- ✅ shadcn/ui - 충족
- ✅ Clerk - 충족
- ✅ GCP Cloud Run - 충족
- **준수**: 모든 표준 기술 스택 사용

### 검사 결과: ✅ 통과 (위반 사항 없음)

**Phase 1 완료 후 재검증** (2025-11-18):
- ✅ 데이터 모델이 페르소나 중심 설계 원칙 준수 (Story, FormSubmission에 사용자 컨텍스트 포함)
- ✅ API 계약에 접근성 고려사항 명시 (Turnstile 스팸 방지, 명확한 에러 메시지)
- ✅ 민감 정보 암호화 전략 수립 (data-model.md 보안 섹션)
- ✅ 성능 최적화 전략 문서화 (캐싱, 인덱스, 쿼리 최적화)
- ✅ 한국어 우선 API 설계 (모든 메시지 및 필드명 한국어)

## 프로젝트 구조

### 문서 (이 기능)

```text
specs/001-institutional-promotion/
├── spec.md              # 기능 명세 (/speckit.specify)
├── plan.md              # 이 파일 (/speckit.plan)
├── research.md          # Phase 0 출력 (아래에서 생성)
├── data-model.md        # Phase 1 출력 (아래에서 생성)
├── quickstart.md        # Phase 1 출력 (아래에서 생성)
├── contracts/           # Phase 1 출력 (API 계약)
│   ├── public-api.yaml  # 공개 API (폼 제출 등)
│   └── admin-api.yaml   # 관리자 API
├── checklists/
│   └── requirements.md  # 요구사항 품질 체크리스트 (완료)
└── tasks.md             # Phase 2 출력 (/speckit.tasks - 별도 명령)
```

### 소스 코드 (저장소 루트)

```text
app/                              # Next.js App Router
├── (public)/                     # 공개 페이지 그룹
│   ├── page.tsx                  # 메인 랜딩 페이지 (신규)
│   ├── about/                    # 소개 및 비전 페이지 (신규)
│   │   └── page.tsx
│   ├── services/                 # 서비스 페이지 (신규)
│   │   └── page.tsx
│   ├── stories/                  # 가족 이야기 페이지 (신규)
│   │   ├── page.tsx              # 목록
│   │   ├── [id]/page.tsx         # 상세
│   │   └── submit/page.tsx       # 사연 제출
│   ├── b2b/                      # B2B 협력 기관 페이지 (신규)
│   │   └── page.tsx
│   └── support/                  # 후원 및 임팩트 페이지 (신규)
│       └── page.tsx
├── dashboard/                    # 사용자 대시보드 (기존)
│   ├── page.tsx
│   ├── apply/page.tsx
│   ├── reservations/page.tsx
│   └── ...
├── admin/                        # 관리자 대시보드 (확장)
│   ├── page.tsx                  # 대시보드 홈 (기존)
│   ├── applications/             # 서비스 신청 관리 (기존)
│   ├── reservations/             # 예약 관리 (기존)
│   ├── forms/                    # 폼 제출 관리 (신규)
│   │   ├── page.tsx              # 목록
│   │   └── [id]/page.tsx         # 상세
│   └── stories/                  # 스토리 승인 관리 (신규)
│       ├── page.tsx              # 승인 대기 목록
│       └── [id]/page.tsx         # 상세 및 승인/거부
├── api/                          # API Routes
│   ├── forms/                    # 폼 제출 API (신규)
│   │   ├── route.ts              # POST /api/forms
│   │   └── [id]/route.ts         # GET/PATCH /api/forms/:id
│   ├── stories/                  # 스토리 API (신규)
│   │   ├── route.ts              # GET/POST /api/stories
│   │   └── [id]/route.ts         # GET/PATCH /api/stories/:id
│   ├── applications/             # 서비스 신청 API (기존)
│   └── ...
├── sign-in/                      # Clerk 로그인 (기존)
└── sign-up/                      # Clerk 회원가입 (기존)

components/                       # React 컴포넌트
├── public/                       # 공개 페이지 컴포넌트 (신규)
│   ├── persona-cards.tsx         # 페르소나 카드
│   ├── service-card.tsx          # 서비스 카드
│   ├── story-card.tsx            # 스토리 카드
│   ├── emergency-form.tsx        # 긴급돌봄 폼
│   ├── partnership-form.tsx      # 파트너십 문의 폼
│   ├── donation-modal.tsx        # 후원 계좌 모달
│   └── timeline.tsx              # 연혁 타임라인
├── admin/                        # 관리자 컴포넌트 (확장)
│   ├── form-list.tsx             # 폼 제출 목록
│   ├── story-approval.tsx        # 스토리 승인 UI
│   └── ...
├── ui/                           # shadcn/ui 컴포넌트 (기존)
│   ├── button.tsx
│   ├── card.tsx
│   ├── form.tsx
│   ├── modal.tsx
│   └── ...
└── header.tsx                    # 헤더 (업데이트)
    footer.tsx                    # 푸터 (신규)

prisma/
├── schema.prisma                 # 데이터베이스 스키마 (확장)
├── migrations/                   # 마이그레이션 (추가)
└── seed.ts                       # 시드 데이터 (업데이트)

lib/
├── db.ts                         # Prisma 클라이언트 (기존)
├── validations/                  # Zod 스키마 (신규)
│   ├── forms.ts                  # 폼 검증
│   └── stories.ts                # 스토리 검증
└── utils.ts                      # 유틸리티 함수 (기존)

public/
├── images/                       # 이미지 에셋 (추가)
│   ├── hero/                     # 히어로 이미지
│   ├── team/                     # 팀 사진
│   ├── services/                 # 서비스 이미지
│   └── partners/                 # 파트너 로고
└── ...

docs/
├── SCREEN_DESIGN.md              # 화면 디자인 명세 (기존)
├── prd.md                        # 제품 요구사항 (기존)
├── DEPLOYMENT.md                 # 배포 가이드 (기존)
└── CLAUDE.md                     # 프로젝트 지침 (기존)

.specify/
├── memory/
│   └── constitution.md           # 프로젝트 헌장 (기존)
└── templates/                    # 템플릿 (기존)
```

**구조 결정**:

기존 Next.js App Router 구조를 유지하면서 공개 페이지를 `app/(public)/` 라우트 그룹으로 추가한다. 관리자 기능은 기존 `app/admin/` 디렉토리를 확장하여 폼 관리 및 스토리 승인 기능을 추가한다. 데이터베이스 스키마는 Prisma를 통해 확장하며, 새로운 엔티티(FormSubmission, Story)를 추가한다.

기존 인증(Clerk), 스타일링(Tailwind CSS), UI 컴포넌트(shadcn/ui) 시스템을 그대로 활용하여 개발 속도를 높이고 일관성을 유지한다.

## 복잡도 추적

> **헌장 위반이 있고 정당화가 필요한 경우에만 작성**

헌장 위반 사항 없음. 모든 요구사항이 헌장의 핵심 원칙과 일치함.

---

# Phase 0: 개요 및 연구

## 기술적 미결정 사항 및 연구 과제

### 1. 관리자 대시보드 구현 패턴

**미결정 사항**: 기존 admin/ 구조에 새로운 기능을 어떻게 통합할 것인가?

**연구 과제**:
- 기존 admin 페이지의 레이아웃 및 네비게이션 구조 분석
- 폼 제출 목록 및 스토리 승인 UI 패턴 조사
- 실시간 업데이트 필요성 검토 (polling vs WebSocket vs Server-Sent Events)

**예상 결과**:
- 기존 패턴을 따르는 일관된 관리자 UI 설계
- 상태 관리 전략 (Server Components vs Client Components)

### 2. 콘텐츠 승인 워크플로우

**미결정 사항**: 스토리 승인/거부 시 사용자 알림 방법?

**연구 과제**:
- 기존 Notification 모델 활용 가능성 검토
- 이메일 알림 통합 방안 (Resend, SendGrid 등)
- 승인 대기 → 승인 → 게시 상태 전환 로직

**예상 결과**:
- 승인 워크플로우 상태 다이어그램
- 알림 전략 (데이터베이스 알림 vs 이메일)

### 3. 이미지 최적화 및 CDN 전략

**미결정 사항**: 사용자 제출 이미지(스토리 첨부) 처리 방법?

**연구 과제**:
- Next.js Image 컴포넌트 최적화 패턴
- Cloud Storage 통합 (Google Cloud Storage)
- 이미지 업로드 크기 제한 및 검증
- WebP 변환 및 리사이징 전략

**예상 결과**:
- 이미지 업로드 및 저장 플로우
- CDN 캐싱 전략

### 4. 검색 및 필터링 구현

**미결정 사항**: 스토리 검색 및 카테고리 필터링 성능 최적화?

**연구 과제**:
- Prisma 풀텍스트 검색 vs 외부 검색 엔진 (Algolia, MeiliSearch)
- 클라이언트 측 필터링 vs 서버 측 쿼리
- 페이지네이션 vs 무한 스크롤

**예상 결과**:
- 검색 및 필터링 아키텍처
- 성능 최적화 전략

### 5. 폼 스팸 방지

**미결정 사항**: 긴급돌봄 및 문의 폼의 스팸 제출 방지 전략?

**연구 과제**:
- reCAPTCHA v3 vs Turnstile (Cloudflare)
- Honeypot 기법
- Rate limiting (IP 기반, 사용자 기반)

**예상 결과**:
- 스팸 방지 메커니즘 선택
- 구현 패턴 및 사용자 경험 영향 최소화

### 6. 성능 모니터링 및 에러 추적

**미결정 사항**: 프로덕션 환경 모니터링 도구?

**연구 과제**:
- Vercel Analytics vs Google Analytics 4
- Sentry vs LogRocket (에러 추적)
- Core Web Vitals 모니터링
- GCP Cloud Monitoring 통합

**예상 결과**:
- 모니터링 스택 선택
- 알림 및 대시보드 설정

---

이제 research.md 파일을 생성하여 각 연구 과제를 수행하겠습니다.
