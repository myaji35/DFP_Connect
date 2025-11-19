# 작업 목록: DFP Connect 기관 홍보 중심 웹사이트 구축

**입력**: `/specs/001-institutional-promotion/` 설계 문서
**전제조건**: plan.md, spec.md, research.md, data-model.md, contracts/

**조직 원칙**: 작업은 User Story별로 그룹화되어 각 스토리를 독립적으로 구현하고 테스트할 수 있도록 합니다.

## 형식: `[ID] [P?] [Story] 설명`

- **[P]**: 병렬 실행 가능 (다른 파일, 의존성 없음)
- **[Story]**: 해당 User Story (US1, US2, US3 등)
- 파일 경로를 명시적으로 포함

## 경로 규칙

- Next.js App Router 프로젝트: `app/`, `components/`, `lib/`, `prisma/`
- 저장소 루트 기준 절대 경로 사용

---

## Phase 1: 초기 설정 (공유 인프라)

**목적**: 프로젝트 초기화 및 기본 구조 설정

- [x] T001 Prisma 스키마에 FormSubmission 모델 추가 (prisma/schema.prisma)
- [x] T002 Prisma 스키마에 FormStatusHistory 모델 추가 (prisma/schema.prisma)
- [x] T003 [P] Prisma 스키마에 Story 모델 추가 (prisma/schema.prisma)
- [x] T004 [P] Prisma 스키마에 StoryStatusHistory 모델 추가 (prisma/schema.prisma)
- [x] T005 [P] Prisma 스키마에 DonationAccount 모델 추가 (prisma/schema.prisma)
- [x] T006 Prisma 스키마에 5개 Enum 추가 (FormType, SubmissionStatus, Priority, StoryCategory, ContentStatus) (prisma/schema.prisma)
- [x] T007 UserProfile 모델에 stories 관계 추가 (prisma/schema.prisma)
- [x] T008 Prisma 마이그레이션 생성 및 적용 (`npx prisma migrate dev --name add-institutional-promotion-models`)
- [x] T009 Prisma 클라이언트 생성 (`npx prisma generate`)
- [x] T010 [P] 추가 의존성 설치 (@upstash/redis, sharp, react-markdown, remark-gfm, @t3-oss/env-nextjs)
- [ ] T011 [P] 환경 변수 설정 파일 생성 (.env.local에 필요한 모든 변수 추가)
- [x] T012 [P] 시드 데이터: DonationAccount 2개 추가 (prisma/seed.ts)
- [x] T013 [P] 시드 데이터: 샘플 Story 2개 추가 (prisma/seed.ts)
- [x] T014 시드 데이터 실행 (`npm run db:seed`)

---

## Phase 2: 기반 시스템 (필수 선행 작업)

**목적**: 모든 User Story가 의존하는 핵심 인프라. 이 단계가 완료되어야 User Story 작업 시작 가능

**⚠️ 중요**: 이 단계가 완료되기 전에는 User Story 작업을 시작할 수 없습니다

- [ ] T015 공통 타입 정의 파일 생성 (lib/types/index.ts)
- [ ] T016 [P] Zod 검증 스키마: 폼 제출 (lib/validations/forms.ts)
- [ ] T017 [P] Zod 검증 스키마: 스토리 (lib/validations/stories.ts)
- [ ] T018 [P] 암호화 유틸리티 함수 (lib/crypto.ts - encrypt, decrypt)
- [ ] T019 [P] Redis 캐싱 유틸리티 (lib/cache.ts - getCachedStories 등)
- [ ] T020 [P] Rate Limiting 미들웨어 (lib/rate-limit.ts - Upstash Redis 기반)
- [ ] T021 [P] Turnstile 검증 함수 (lib/turnstile.ts)
- [ ] T022 공통 API 응답 헬퍼 함수 (lib/api-response.ts - success, error)
- [ ] T023 [P] 공통 UI 컴포넌트: Loading Spinner (components/ui/loading.tsx)
- [ ] T024 [P] 공통 UI 컴포넌트: Toast Notification (components/ui/toast.tsx)
- [ ] T025 [P] 공통 UI 컴포넌트: Modal Dialog (components/ui/dialog.tsx)
- [ ] T026 헤더 네비게이션 컴포넌트 업데이트 (components/header.tsx - 6개 메뉴 추가)
- [ ] T027 푸터 컴포넌트 생성 (components/footer.tsx)
- [ ] T028 메인 레이아웃 업데이트 (app/layout.tsx - 헤더/푸터 포함)
- [ ] T029 [P] 에러 페이지 생성 (app/error.tsx)
- [ ] T030 [P] 404 페이지 생성 (app/not-found.tsx)

**체크포인트**: 기반 시스템 완료 - User Story 구현을 병렬로 시작할 수 있습니다

---

## Phase 3: User Story 1 - 메인 랜딩 페이지 (Priority: P1) 🎯 MVP

**목표**: 방문자가 조직의 가치와 3개 페르소나를 3초 이내에 파악하고 해당 페이지로 이동할 수 있도록 함

**독립 테스트**: 랜딩 페이지만 배포하여 5명 중 4명이 조직의 미션을 정확히 이해하는지 확인

### 구현

- [ ] T031 [P] [US1] 라우트 그룹 생성 (app/(public) 디렉토리)
- [ ] T032 [P] [US1] 페르소나 카드 타입 정의 (lib/types/persona.ts)
- [ ] T033 [P] [US1] 페르소나 데이터 상수 (lib/constants/personas.ts - 3개 페르소나 정의)
- [ ] T034 [US1] PersonaCard 컴포넌트 생성 (components/public/persona-card.tsx - 단일 카드)
- [ ] T035 [US1] PersonaCards 컴포넌트 생성 (components/public/persona-cards.tsx - 3개 카드 그리드)
- [ ] T036 [P] [US1] Hero 섹션 컴포넌트 (components/public/hero-section.tsx)
- [ ] T037 [P] [US1] Mission 섹션 컴포넌트 (components/public/mission-section.tsx)
- [ ] T038 [US1] 메인 랜딩 페이지 (app/(public)/page.tsx - Hero + Mission + PersonaCards)
- [ ] T039 [P] [US1] 메인 페이지 메타데이터 추가 (app/(public)/page.tsx - SEO)
- [ ] T040 [P] [US1] 반응형 스타일 검증 (모바일/태블릿/데스크톱)

**체크포인트**: User Story 1이 독립적으로 동작하고 테스트 가능해야 함

---

## Phase 4: User Story 2 - 긴급돌봄 요청 (Priority: P1) 🎯 MVP

**목표**: 긴급 상황 시 1분 이내에 도움을 요청하고 확인 메시지를 받을 수 있음

**독립 테스트**: 긴급돌봄 폼만 테스트하여 30초 이내에 제출 완료 및 확인 메시지 표시 확인

### API 구현

- [ ] T041 [P] [US2] FormSubmission API Route 핸들러 생성 (app/api/forms/route.ts - POST)
- [ ] T042 [US2] FormSubmission POST 로직 구현 (데이터베이스 저장, 상태 이력 생성)
- [ ] T043 [US2] FormSubmission POST에 Turnstile 검증 추가
- [ ] T044 [US2] FormSubmission POST에 Rate Limiting 추가
- [ ] T045 [US2] FormSubmission POST 응답 포맷 구현
- [ ] T046 [P] [US2] 긴급돌봄 자동 우선순위 HIGH 설정 로직

### UI 구현

- [ ] T047 [P] [US2] 긴급돌봄 폼 타입 정의 (lib/types/emergency-form.ts)
- [ ] T048 [US2] EmergencyForm 컴포넌트 생성 (components/public/emergency-form.tsx)
- [ ] T049 [US2] EmergencyForm 폼 검증 로직 (Zod 스키마 사용)
- [ ] T050 [US2] EmergencyForm 제출 핸들러 (API 호출, 로딩 상태)
- [ ] T051 [US2] EmergencyForm 에러 핸들링 (필드별 에러 표시)
- [ ] T052 [US2] EmergencyForm 성공 메시지 표시 (Toast)
- [ ] T053 [US2] 서비스 페이지 생성 (app/(public)/services/page.tsx)
- [ ] T054 [US2] 서비스 페이지에 EmergencyForm 통합
- [ ] T055 [P] [US2] 긴급돌봄 버튼을 메인 페이지에 고정 추가 (Floating Action Button)

**체크포인트**: User Story 2가 독립적으로 동작 (폼 제출 → DB 저장 → 확인 메시지)

---

## Phase 5: User Story 3 - 조직 소개 페이지 (Priority: P2)

**목표**: 방문자가 조직의 신뢰성과 전문성을 확인할 수 있도록 연혁, 팀, 임팩트 데이터 제공

**독립 테스트**: 소개 페이지만 배포하여 협력 기관 담당자 10명 중 7명이 파트너십 의향 표시

### 데이터 및 타입

- [ ] T056 [P] [US3] 연혁 데이터 타입 정의 (lib/types/timeline.ts)
- [ ] T057 [P] [US3] 팀 멤버 데이터 타입 정의 (lib/types/team.ts)
- [ ] T058 [P] [US3] 연혁 데이터 상수 (lib/constants/timeline.ts - 2018-2024)
- [ ] T059 [P] [US3] 팀 데이터 상수 (lib/constants/team.ts - 이사장, 본부장, 팀장)

### UI 컴포넌트

- [ ] T060 [P] [US3] TimelineItem 컴포넌트 (components/public/timeline-item.tsx)
- [ ] T061 [US3] Timeline 컴포넌트 (components/public/timeline.tsx - 연혁 타임라인)
- [ ] T062 [P] [US3] TeamMemberCard 컴포넌트 (components/public/team-member-card.tsx)
- [ ] T063 [US3] TeamGrid 컴포넌트 (components/public/team-grid.tsx)
- [ ] T064 [P] [US3] VisionMissionSection 컴포넌트 (components/public/vision-mission.tsx)
- [ ] T065 [P] [US3] ImpactStats 컴포넌트 (components/public/impact-stats.tsx - 500가구, 45개 파트너십)

### 페이지

- [ ] T066 [US3] 소개 페이지 생성 (app/(public)/about/page.tsx)
- [ ] T067 [US3] 소개 페이지에 모든 섹션 통합 (Hero + Vision/Mission + Timeline + Team + Impact)
- [ ] T068 [P] [US3] 소개 페이지 메타데이터 추가 (SEO)

**체크포인트**: User Story 3 독립 동작 (소개 페이지 완성)

---

## Phase 6: User Story 4 - 서비스 탐색 (Priority: P2)

**목표**: 모든 서비스를 카테고리별로 탐색하고 신청 방법 확인 가능

**독립 테스트**: 서비스 페이지에서 3클릭 이내에 "방과후 홈티" 신청 방법 찾기

### 데이터 및 타입

- [ ] T069 [P] [US4] 서비스 데이터 타입 정의 (lib/types/service.ts)
- [ ] T070 [P] [US4] 서비스 카테고리 Enum (lib/types/service.ts)
- [ ] T071 [P] [US4] 서비스 데이터 상수 (lib/constants/services.ts - 긴급돌봄, 홈티, 상담, 여행)

### UI 컴포넌트

- [ ] T072 [P] [US4] ServiceCard 컴포넌트 (components/public/service-card.tsx)
- [ ] T073 [US4] ServiceGrid 컴포넌트 (components/public/service-grid.tsx)
- [ ] T074 [P] [US4] ServiceFilter 컴포넌트 (components/public/service-filter.tsx - 탭 필터)
- [ ] T075 [US4] ServiceDetail 모달 컴포넌트 (components/public/service-detail-modal.tsx)
- [ ] T076 [US4] 서비스 필터 로직 (클라이언트 사이드 필터링)

### 페이지

- [ ] T077 [US4] 서비스 페이지 업데이트 (app/(public)/services/page.tsx - 기존 페이지 확장)
- [ ] T078 [US4] 서비스 페이지에 필터 및 그리드 통합
- [ ] T079 [P] [US4] 서비스 페이지 메타데이터 추가 (SEO)

**체크포인트**: User Story 4 독립 동작 (서비스 탐색 및 상세 정보 확인)

---

## Phase 7: User Story 5 - 가족 스토리 (Priority: P3)

**목표**: 가족 이야기를 읽고, 검색/필터링하며, 자신의 이야기를 제출할 수 있음

**독립 테스트**: 스토리 페이지에서 최소 3개 스토리 읽고 "사연 보내기" 버튼 찾기

### API 구현

- [ ] T080 [P] [US5] GET /api/stories Route 핸들러 (app/api/stories/route.ts)
- [ ] T081 [US5] GET /api/stories 로직 (필터, 검색, 페이지네이션)
- [ ] T082 [US5] GET /api/stories에 캐싱 추가 (Redis 5분 TTL)
- [ ] T083 [P] [US5] POST /api/stories Route 핸들러 (app/api/stories/route.ts)
- [ ] T084 [US5] POST /api/stories 로직 (Story 생성, 상태 PENDING)
- [ ] T085 [US5] POST /api/stories에 Turnstile 검증 추가
- [ ] T086 [US5] POST /api/stories에 Rate Limiting 추가
- [ ] T087 [P] [US5] GET /api/stories/[id] Route 핸들러 (app/api/stories/[id]/route.ts)
- [ ] T088 [US5] GET /api/stories/[id] 로직 (상세 조회, viewCount 증가)

### UI 컴포넌트

- [ ] T089 [P] [US5] StoryCard 컴포넌트 (components/public/story-card.tsx)
- [ ] T090 [US5] StoryGrid 컴포넌트 (components/public/story-grid.tsx)
- [ ] T091 [P] [US5] StorySearchBar 컴포넌트 (components/public/story-search-bar.tsx)
- [ ] T092 [P] [US5] StoryCategoryFilter 컴포넌트 (components/public/story-category-filter.tsx)
- [ ] T093 [P] [US5] StoryPagination 컴포넌트 (components/public/story-pagination.tsx)
- [ ] T094 [P] [US5] StorySubmitForm 컴포넌트 (components/public/story-submit-form.tsx)
- [ ] T095 [US5] StorySubmitForm 검증 로직 (Zod)
- [ ] T096 [US5] StorySubmitForm 제출 핸들러
- [ ] T097 [US5] StorySubmitForm 이미지 업로드 기능 (선택사항)

### 페이지

- [ ] T098 [US5] 스토리 목록 페이지 (app/(public)/stories/page.tsx)
- [ ] T099 [US5] 스토리 목록 페이지에 검색/필터/그리드 통합
- [ ] T100 [P] [US5] 스토리 상세 페이지 (app/(public)/stories/[id]/page.tsx)
- [ ] T101 [US5] 스토리 상세 페이지 구현 (Markdown 렌더링)
- [ ] T102 [P] [US5] 스토리 제출 페이지 (app/(public)/stories/submit/page.tsx)
- [ ] T103 [US5] 스토리 제출 페이지에 폼 통합
- [ ] T104 [P] [US5] 스토리 페이지들 메타데이터 추가 (SEO)

**체크포인트**: User Story 5 독립 동작 (스토리 조회, 검색, 제출)

---

## Phase 8: User Story 6 - B2B 파트너십 (Priority: P2)

**목표**: 협력 기관이 서비스를 확인하고 파트너십을 문의할 수 있음

**독립 테스트**: B2B 페이지에서 3분 이내에 문의 폼 작성 및 제출

### 데이터 및 타입

- [ ] T105 [P] [US6] B2B 서비스 데이터 타입 (lib/types/b2b-service.ts)
- [ ] T106 [P] [US6] B2B 서비스 데이터 상수 (lib/constants/b2b-services.ts - 파견, 컨설팅, 워크숍, 프로그램)
- [ ] T107 [P] [US6] 파트너 후기 데이터 상수 (lib/constants/partner-testimonials.ts)

### UI 컴포넌트

- [ ] T108 [P] [US6] B2BServiceCard 컴포넌트 (components/public/b2b-service-card.tsx)
- [ ] T109 [US6] B2BServiceGrid 컴포넌트 (components/public/b2b-service-grid.tsx)
- [ ] T110 [P] [US6] PartnerTestimonial 컴포넌트 (components/public/partner-testimonial.tsx)
- [ ] T111 [P] [US6] PartnershipForm 컴포넌트 (components/public/partnership-form.tsx)
- [ ] T112 [US6] PartnershipForm 검증 로직 (Zod)
- [ ] T113 [US6] PartnershipForm 제출 핸들러 (POST /api/forms)

### 페이지

- [ ] T114 [US6] B2B 페이지 생성 (app/(public)/b2b/page.tsx)
- [ ] T115 [US6] B2B 페이지에 모든 섹션 통합 (Hero + Services + Benefits + Testimonials + Form)
- [ ] T116 [P] [US6] B2B 페이지 메타데이터 추가 (SEO)

**체크포인트**: User Story 6 독립 동작 (B2B 서비스 확인 및 문의)

---

## Phase 9: User Story 7 - 후원 및 임팩트 (Priority: P3)

**목표**: 후원자가 임팩트 데이터를 확인하고 후원 계좌 정보를 받을 수 있음

**독립 테스트**: 후원 페이지에서 임팩트 통계와 "지금 기부하기" 버튼 찾기

### API 구현

- [ ] T117 [P] [US7] GET /api/donations/accounts Route 핸들러 (app/api/donations/accounts/route.ts)
- [ ] T118 [US7] GET /api/donations/accounts 로직 (활성 계좌 목록 반환)
- [ ] T119 [US7] GET /api/donations/accounts에 캐싱 추가 (Redis 1시간 TTL)

### 데이터 및 타입

- [ ] T120 [P] [US7] 임팩트 통계 데이터 타입 (lib/types/impact.ts)
- [ ] T121 [P] [US7] 기여 방법 데이터 타입 (lib/types/contribution.ts)
- [ ] T122 [P] [US7] 임팩트 통계 데이터 상수 (lib/constants/impact-stats.ts - 500가구, 45개 파트너십, 15억원)
- [ ] T123 [P] [US7] 기여 방법 데이터 상수 (lib/constants/contributions.ts - 4가지 방법)
- [ ] T124 [P] [US7] 파트너 로고 데이터 상수 (lib/constants/partners.ts - Naver, Kakao, etc.)

### UI 컴포넌트

- [ ] T125 [P] [US7] ImpactStatCard 컴포넌트 (components/public/impact-stat-card.tsx)
- [ ] T126 [US7] ImpactStatsGrid 컴포넌트 (components/public/impact-stats-grid.tsx)
- [ ] T127 [P] [US7] ContributionCard 컴포넌트 (components/public/contribution-card.tsx)
- [ ] T128 [US7] ContributionGrid 컴포넌트 (components/public/contribution-grid.tsx)
- [ ] T129 [P] [US7] PartnerLogos 컴포넌트 (components/public/partner-logos.tsx)
- [ ] T130 [P] [US7] DonationModal 컴포넌트 (components/public/donation-modal.tsx)
- [ ] T131 [US7] DonationModal 계좌 정보 표시 (API에서 데이터 가져오기)
- [ ] T132 [US7] DonationModal 계좌번호 복사 기능
- [ ] T133 [P] [US7] SupportForm 컴포넌트 (components/public/support-form.tsx - 후원 문의)
- [ ] T134 [US7] SupportForm 제출 핸들러

### 페이지

- [ ] T135 [US7] 후원 페이지 생성 (app/(public)/support/page.tsx)
- [ ] T136 [US7] 후원 페이지에 모든 섹션 통합 (Hero + Impact Stats + Social Impact + Contributions + Partners + Form)
- [ ] T137 [P] [US7] 후원 페이지 메타데이터 추가 (SEO)

**체크포인트**: User Story 7 독립 동작 (임팩트 확인 및 후원 정보 조회)

---

## Phase 10: 관리자 대시보드 - 폼 관리

**목표**: 관리자가 폼 제출 내역을 조회하고 상태를 관리할 수 있음

### API 구현

- [ ] T138 [P] 관리자 미들웨어 (lib/middleware/admin-auth.ts - Clerk userType 검증)
- [ ] T139 [P] GET /api/admin/forms Route 핸들러 (app/api/admin/forms/route.ts)
- [ ] T140 GET /api/admin/forms 로직 (필터, 정렬, 페이지네이션)
- [ ] T141 GET /api/admin/forms 권한 검증 (관리자만 접근)
- [ ] T142 [P] GET /api/admin/forms/[id] Route 핸들러 (app/api/admin/forms/[id]/route.ts)
- [ ] T143 GET /api/admin/forms/[id] 로직 (상세 조회 + 상태 이력)
- [ ] T144 [P] PATCH /api/admin/forms/[id] Route 핸들러 (app/api/admin/forms/[id]/route.ts)
- [ ] T145 PATCH /api/admin/forms/[id] 로직 (상태 업데이트, 담당자 할당, 메모)
- [ ] T146 PATCH /api/admin/forms/[id]에 상태 이력 자동 생성

### UI 컴포넌트

- [ ] T147 [P] FormListTable 컴포넌트 (components/admin/form-list-table.tsx)
- [ ] T148 FormListTable 필터 UI (formType, status, priority, date range)
- [ ] T149 FormListTable 정렬 기능
- [ ] T150 FormListTable 페이지네이션
- [ ] T151 [P] FormDetailCard 컴포넌트 (components/admin/form-detail-card.tsx)
- [ ] T152 [P] FormStatusSelect 컴포넌트 (components/admin/form-status-select.tsx)
- [ ] T153 [P] FormAssignSelect 컴포넌트 (components/admin/form-assign-select.tsx - 담당자 선택)
- [ ] T154 [P] FormNotesTextarea 컴포넌트 (components/admin/form-notes-textarea.tsx)
- [ ] T155 [P] FormStatusHistoryTimeline 컴포넌트 (components/admin/form-status-history.tsx)

### 페이지

- [ ] T156 관리자 폼 목록 페이지 (app/admin/forms/page.tsx)
- [ ] T157 관리자 폼 목록 페이지에 테이블 및 필터 통합
- [ ] T158 [P] 관리자 폼 상세 페이지 (app/admin/forms/[id]/page.tsx)
- [ ] T159 관리자 폼 상세 페이지 구현 (상세 정보 + 상태 업데이트 UI)
- [ ] T160 관리자 폼 상세 페이지 업데이트 핸들러

**체크포인트**: 관리자가 모든 폼 제출을 조회하고 관리 가능

---

## Phase 11: 관리자 대시보드 - 스토리 승인

**목표**: 관리자가 제출된 스토리를 검토하고 승인/거부할 수 있음

### API 구현

- [ ] T161 [P] GET /api/admin/stories Route 핸들러 (app/api/admin/stories/route.ts)
- [ ] T162 GET /api/admin/stories 로직 (모든 상태 조회, 필터, 페이지네이션)
- [ ] T163 GET /api/admin/stories 권한 검증
- [ ] T164 [P] GET /api/admin/stories/[id] Route 핸들러 (app/api/admin/stories/[id]/route.ts)
- [ ] T165 GET /api/admin/stories/[id] 로직 (상세 조회 + 상태 이력)
- [ ] T166 [P] PATCH /api/admin/stories/[id] Route 핸들러 (app/api/admin/stories/[id]/route.ts)
- [ ] T167 PATCH /api/admin/stories/[id] 로직 (승인/거부/게시/보관)
- [ ] T168 PATCH /api/admin/stories/[id]에 상태 전환 검증 (허용된 전환만)
- [ ] T169 PATCH /api/admin/stories/[id]에 상태 이력 자동 생성
- [ ] T170 PATCH /api/admin/stories/[id] 승인 시 알림 생성 (Notification 테이블)

### UI 컴포넌트

- [ ] T171 [P] StoryListTable 컴포넌트 (components/admin/story-list-table.tsx)
- [ ] T172 StoryListTable 필터 UI (status, category)
- [ ] T173 StoryListTable 정렬 및 페이지네이션
- [ ] T174 [P] StoryReviewCard 컴포넌트 (components/admin/story-review-card.tsx)
- [ ] T175 [P] StoryActionButtons 컴포넌트 (components/admin/story-action-buttons.tsx - 승인/거부/게시)
- [ ] T176 [P] StoryReviewNotesTextarea 컴포넌트 (components/admin/story-review-notes.tsx)
- [ ] T177 [P] StoryStatusHistoryTimeline 컴포넌트 (components/admin/story-status-history.tsx)

### 페이지

- [ ] T178 관리자 스토리 목록 페이지 (app/admin/stories/page.tsx)
- [ ] T179 관리자 스토리 목록 페이지에 테이블 및 필터 통합
- [ ] T180 [P] 관리자 스토리 상세 페이지 (app/admin/stories/[id]/page.tsx)
- [ ] T181 관리자 스토리 상세 페이지 구현 (미리보기 + 승인/거부 UI)
- [ ] T182 관리자 스토리 상세 페이지 액션 핸들러

**체크포인트**: 관리자가 스토리를 검토하고 승인/거부 가능

---

## Phase 12: 관리자 대시보드 - 통계 및 분석

**목표**: 관리자가 핵심 지표와 최근 활동을 한눈에 확인할 수 있음

### API 구현

- [ ] T183 [P] GET /api/admin/analytics/dashboard Route 핸들러 (app/api/admin/analytics/dashboard/route.ts)
- [ ] T184 GET /api/admin/analytics/dashboard 로직 (폼/스토리 통계, 최근 활동)
- [ ] T185 GET /api/admin/analytics/dashboard 권한 검증
- [ ] T186 [P] GET /api/admin/analytics/forms Route 핸들러 (app/api/admin/analytics/forms/route.ts)
- [ ] T187 GET /api/admin/analytics/forms 로직 (시계열 데이터, 분포도)

### UI 컴포넌트

- [ ] T188 [P] DashboardStatCard 컴포넌트 (components/admin/dashboard-stat-card.tsx)
- [ ] T189 [P] DashboardStatsGrid 컴포넌트 (components/admin/dashboard-stats-grid.tsx)
- [ ] T190 [P] RecentActivityList 컴포넌트 (components/admin/recent-activity-list.tsx)
- [ ] T191 [P] FormAnalyticsChart 컴포넌트 (components/admin/form-analytics-chart.tsx - 선택사항)

### 페이지

- [ ] T192 관리자 대시보드 홈 업데이트 (app/admin/page.tsx)
- [ ] T193 관리자 대시보드에 통계 카드 통합
- [ ] T194 관리자 대시보드에 최근 활동 통합

**체크포인트**: 관리자가 대시보드에서 핵심 지표 확인 가능

---

## Phase 13: 마무리 및 크로스-커팅 작업

**목적**: 모든 User Story에 영향을 주는 개선 사항

- [ ] T195 [P] 모든 공개 페이지 Open Graph 이미지 추가 (public/og/)
- [ ] T196 [P] Sitemap 생성 (app/sitemap.ts)
- [ ] T197 [P] Robots.txt 생성 (app/robots.txt)
- [ ] T198 [P] 접근성 테스트 (axe-core 또는 Lighthouse)
- [ ] T199 [P] 성능 테스트 (Lighthouse - LCP < 3s 목표)
- [ ] T200 [P] 모바일 반응형 테스트 (모든 페이지)
- [ ] T201 [P] 다크 모드 검증 (모든 컴포넌트)
- [ ] T202 [P] 에러 처리 검증 (모든 API 엔드포인트)
- [ ] T203 [P] Rate Limiting 테스트
- [ ] T204 [P] Turnstile 스팸 방지 테스트
- [ ] T205 이미지 최적화 (WebP 변환, lazy loading)
- [ ] T206 [P] 코드 정리 및 리팩토링
- [ ] T207 [P] TypeScript 타입 검사 (`npx tsc --noEmit`)
- [ ] T208 [P] ESLint 검사 및 수정 (`npm run lint`)
- [ ] T209 [P] README.md 업데이트 (새로운 기능 문서화)
- [ ] T210 quickstart.md 검증 (로컬 환경 설정 가이드 테스트)
- [ ] T211 프로덕션 배포 준비 (환경 변수 확인)
- [ ] T212 프로덕션 빌드 테스트 (`npm run build`)

---

## 의존성 및 실행 순서

### Phase 의존성

- **Setup (Phase 1)**: 의존성 없음 - 즉시 시작 가능
- **Foundational (Phase 2)**: Setup 완료 후 - 모든 User Story를 차단
- **User Stories (Phase 3-9)**: Foundational 완료 후
  - User Story들은 병렬 진행 가능 (인력이 있다면)
  - 또는 우선순위 순서대로 순차 진행 (P1 → P2 → P3)
- **Admin Dashboard (Phase 10-12)**: User Story 2, 5 완료 후 (폼 및 스토리 API 필요)
- **Polish (Phase 13)**: 모든 원하는 User Story 완료 후

### User Story 의존성

- **User Story 1 (P1)**: Foundational 완료 후 - 다른 스토리 의존성 없음
- **User Story 2 (P1)**: Foundational 완료 후 - 다른 스토리 의존성 없음
- **User Story 3 (P2)**: Foundational 완료 후 - 다른 스토리 의존성 없음
- **User Story 4 (P2)**: Foundational 완료 후 - 다른 스토리 의존성 없음 (US2와 통합 가능)
- **User Story 5 (P3)**: Foundational 완료 후 - 다른 스토리 의존성 없음
- **User Story 6 (P2)**: Foundational 완료 후 - 다른 스토리 의존성 없음
- **User Story 7 (P3)**: Foundational 완료 후 - 다른 스토리 의존성 없음

### User Story 내 실행 순서

- 데이터 타입 및 상수 먼저
- API 구현 (백엔드)
- UI 컴포넌트 (프론트엔드)
- 페이지 통합
- 메타데이터 및 최적화

### 병렬 실행 기회

- Phase 1의 모든 [P] 작업 (T003-T005, T010-T013)
- Phase 2의 모든 [P] 작업 (T016-T030)
- Foundational 완료 후 모든 User Story를 병렬 시작 가능
- 각 User Story 내에서 [P] 마크된 작업들
- Admin Dashboard phases (10-12)도 병렬 가능

---

## 병렬 실행 예시: User Story 1

```bash
# User Story 1의 병렬 작업들:
Task: "라우트 그룹 생성 (app/(public) 디렉토리)" [T031]
Task: "페르소나 카드 타입 정의 (lib/types/persona.ts)" [T032]
Task: "페르소나 데이터 상수 (lib/constants/personas.ts)" [T033]

# 이후 순차 작업:
Task: "PersonaCard 컴포넌트 생성" [T034]
Task: "PersonaCards 컴포넌트 생성" [T035]

# 다시 병렬 가능:
Task: "Hero 섹션 컴포넌트" [T036]
Task: "Mission 섹션 컴포넌트" [T037]

# 최종 통합:
Task: "메인 랜딩 페이지" [T038]
```

---

## 병렬 실행 예시: User Story 2

```bash
# User Story 2의 병렬 작업들:
Task: "FormSubmission API Route 핸들러 생성" [T041]
Task: "긴급돌봄 폼 타입 정의" [T047]
Task: "긴급돌봄 자동 우선순위 HIGH 설정 로직" [T046]

# 순차 작업 (API 완성):
Task: "FormSubmission POST 로직 구현" [T042]
Task: "FormSubmission POST에 Turnstile 검증 추가" [T043]
Task: "FormSubmission POST에 Rate Limiting 추가" [T044]
Task: "FormSubmission POST 응답 포맷 구현" [T045]

# UI 작업 (API와 병렬 가능):
Task: "EmergencyForm 컴포넌트 생성" [T048]
Task: "EmergencyForm 폼 검증 로직" [T049]
...
```

---

## 구현 전략

### MVP 우선 (User Story 1 + 2만)

1. Phase 1 완료: Setup
2. Phase 2 완료: Foundational (중요 - 모든 스토리 차단)
3. Phase 3 완료: User Story 1 (메인 랜딩)
4. Phase 4 완료: User Story 2 (긴급돌봄)
5. **중단 및 검증**: US1 + US2를 독립적으로 테스트
6. 배포/데모 준비

### 점진적 배포

1. Setup + Foundational → 기반 완료
2. User Story 1 추가 → 독립 테스트 → 배포/데모 (MVP!)
3. User Story 2 추가 → 독립 테스트 → 배포/데모
4. User Story 3 추가 → 독립 테스트 → 배포/데모
5. User Story 4-7 순차 추가
6. Admin Dashboard 추가 (Phase 10-12)
7. 각 스토리가 이전 스토리를 깨지 않고 가치 추가

### 병렬 팀 전략

여러 개발자가 있는 경우:

1. 팀 전체가 Setup + Foundational 완료
2. Foundational 완료 후:
   - 개발자 A: User Story 1 + 2 (MVP - P1 우선순위)
   - 개발자 B: User Story 3 + 4 (P2)
   - 개발자 C: User Story 5 + 7 (P3)
   - 개발자 D: User Story 6 + Admin Dashboard (P2 + Admin)
3. 각 스토리가 독립적으로 완성되고 통합됨

---

## 작업 요약

- **총 작업 수**: 212개
- **User Story별 작업 수**:
  - Setup (Phase 1): 14개
  - Foundational (Phase 2): 16개
  - US1 (메인 랜딩): 10개
  - US2 (긴급돌봄): 15개
  - US3 (조직 소개): 13개
  - US4 (서비스 탐색): 11개
  - US5 (가족 스토리): 25개
  - US6 (B2B 파트너십): 12개
  - US7 (후원/임팩트): 23개
  - Admin - 폼 관리: 23개
  - Admin - 스토리 승인: 22개
  - Admin - 통계: 12개
  - Polish: 18개

- **병렬 실행 기회**: 약 80개 작업이 [P] 마크됨
- **독립 테스트 기준**: 각 User Story별로 정의됨
- **권장 MVP 범위**: Phase 1-4 (Setup + Foundational + US1 + US2)

---

## 주의사항

- [P] 작업 = 다른 파일, 의존성 없음
- [Story] 레이블로 작업을 특정 User Story에 매핑하여 추적 가능
- 각 User Story는 독립적으로 완성 및 테스트 가능해야 함
- 각 체크포인트에서 중단하여 스토리를 독립적으로 검증 가능
- 작업 또는 논리적 그룹 후 커밋
- 회피할 것: 모호한 작업, 동일 파일 충돌, 스토리 독립성을 깨는 교차 의존성

---

**마지막 업데이트**: 2025-11-18 | **문서 버전**: 1.0
