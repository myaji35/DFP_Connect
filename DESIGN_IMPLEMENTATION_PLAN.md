# DFP Connect 디자인 구현 계획

> stitch_ 디렉토리 HTML 템플릿 분석 기반 디자인 시스템 구현 계획

## 📋 목차

1. [디자인 시스템 분석](#1-디자인-시스템-분석)
2. [템플릿별 페이지 매핑](#2-템플릿별-페이지-매핑)
3. [컴포넌트 구현 계획](#3-컴포넌트-구현-계획)
4. [우선순위 및 단계별 구현](#4-우선순위-및-단계별-구현)
5. [기술 구현 방안](#5-기술-구현-방안)

---

## 1. 디자인 시스템 분석

### 1.1 색상 팔레트

#### Primary Colors (파랑 계열)
- **Primary Blue**: `#2b8cee` / `#4A90E2`
- **용도**: 주요 CTA, 링크, 헤더 강조

#### Secondary Colors (용도별)
- **Success Green**: `#7ED321` - 성공 메시지, 긍정적 지표
- **Warning Orange**: `#F5A623` / `#f9a826` / `#f59e0b` - 주목, 강조
- **Emergency Red**: `#D32F2F` - 긴급돌봄 서비스 강조

#### Neutral Colors
- **Gray Scale**:
  - `gray-50` ~ `gray-900` (Tailwind 기본 팔레트)
  - 배경: `gray-50`, `gray-100`
  - 텍스트: `gray-600`, `gray-700`, `gray-900`
  - 보더: `gray-200`, `gray-300`

#### Dark Mode Support
- 모든 템플릿에서 `dark:` 클래스 변형 지원
- CSS 커스텀 프로퍼티 활용

### 1.2 타이포그래피

#### 폰트 패밀리
```css
font-family: 'Noto Sans KR', 'Inter', sans-serif;
```

#### 타이포그래피 스케일
- **Hero Title**: `text-5xl` ~ `text-8xl`, `font-bold`
- **Page Title**: `text-3xl` ~ `text-4xl`, `font-bold`
- **Section Title**: `text-2xl` ~ `text-3xl`, `font-semibold`
- **Card Title**: `text-xl`, `font-semibold`
- **Body**: `text-base`, `font-normal`
- **Caption**: `text-sm` ~ `text-xs`, `text-gray-600`

### 1.3 간격 시스템

#### Container
- **Max Width**: `max-w-7xl` (메인), `max-w-4xl` (폼), `max-w-6xl` (중간)
- **Padding**: `px-4` (모바일), `px-6` (태블릿), `px-8` (데스크탑)
- **Section Spacing**: `py-12` ~ `py-24`

#### Component Spacing
- **Card Padding**: `p-6` ~ `p-8`
- **Gap**: `gap-4`, `gap-6`, `gap-8` (그리드/플렉스)
- **Margin**: `mb-4`, `mb-6`, `mb-8`, `mb-12`

### 1.4 그림자와 효과

```css
/* Card Shadow */
shadow-lg, shadow-xl

/* Hover Effects */
hover:shadow-2xl
hover:scale-105
transition-all duration-300

/* Gradient Backgrounds */
bg-gradient-to-b from-gray-50 to-white
bg-gradient-to-r from-blue-600 to-blue-800
```

### 1.5 아이콘 시스템

- **라이브러리**: Material Symbols (현재 lucide-react 사용 중)
- **크기**: `w-5 h-5` (작음), `w-6 h-6` (중간), `w-8 h-8` ~ `w-16 h-16` (큼)
- **색상**: 텍스트 색상 상속 또는 테마 색상

---

## 2. 템플릿별 페이지 매핑

### 2.1 Main Landing Page → `/` (홈페이지)

**stitch_/main_landing_page/**

#### 현재 상태
- 기존 `app/page.tsx` 존재
- 3개 페르소나 카드 레이아웃 필요

#### 템플릿 주요 요소
1. **Hero Section**
   - 배경 그라디언트 + 배경 이미지 오버레이
   - 큰 제목 + 서브타이틀 + CTA 버튼

2. **3-Persona Cards**
   - 가족 서비스 이용자 (Families)
   - 협력 파트너 (B2B Partners)
   - 후원자 (Sponsors)
   - 각 카드: 아이콘 + 제목 + 설명 + CTA 링크

3. **Quick Stats/Impact Numbers**
   - 숫자 강조 섹션 (서비스 건수, 만족도 등)

4. **Latest Stories/News**
   - 최근 가족 이야기 미리보기 (3-4개 카드)

#### 구현 필요 컴포넌트
- `HeroSection.tsx` - 풀스크린 히어로
- `PersonaCard.tsx` - 페르소나별 카드
- `ImpactStats.tsx` - 통계 카운터
- `StoryPreviewCard.tsx` - 스토리 미리보기 카드

---

### 2.2 About Us & Vision → `/about` (조직 소개)

**stitch_/about_us_&_vision/**

#### 현재 상태
- 생성 필요 (현재 존재하지 않음)

#### 템플릿 주요 요소
1. **Hero with Background Image**
   - 배경 이미지 + 다크 오버레이
   - 조직명 + 슬로건

2. **Vision, Mission, Values Cards**
   - 3단 카드 그리드
   - 아이콘 + 제목 + 설명

3. **Timeline Section**
   - 연혁 타임라인
   - 주요 이정표 표시

4. **Team Section (Optional)**
   - 팀원 소개 카드

#### 구현 필요 컴포넌트
- `ImageHero.tsx` - 이미지 배경 히어로
- `VMVCard.tsx` - Vision/Mission/Values 카드
- `Timeline.tsx` - 타임라인 컴포넌트
- `TeamMemberCard.tsx` - 팀 소개 카드

#### 구현 우선순위
**Phase 1** (필수)

---

### 2.3 Family Services Overview → `/services` (서비스 안내)

**stitch_/family_services_overview/**

#### 현재 상태
- `app/(public)/services/page.tsx` 존재

#### 템플릿 주요 요소
1. **Emergency Care Highlight Box**
   - 빨간색 강조 박스 (긴급돌봄 서비스)
   - 전화번호 + 즉시 신청 버튼

2. **Service Cards Grid**
   - 4-5개 주요 서비스 카드
   - 아이콘 + 제목 + 설명 + 링크
   - 서비스: 긴급돌봄, 방과후 홈티, 상담, 여행, 전문인력 파견

3. **Service Process Flow**
   - 신청 → 상담 → 매칭 → 서비스 제공 → 피드백
   - 스텝 번호 + 설명

4. **FAQ Accordion**
   - 자주 묻는 질문
   - 확장/축소 가능

#### 구현 필요 컴포넌트
- `EmergencyHighlightBox.tsx` - 긴급 서비스 강조 박스
- `ServiceCard.tsx` - 서비스 소개 카드
- `ProcessFlow.tsx` - 프로세스 플로우 다이어그램
- `FAQAccordion.tsx` - FAQ 아코디언

#### 구현 우선순위
**Phase 1** (필수)

---

### 2.4 Family Stories & Community → `/stories` (가족 이야기)

**stitch_/family_stories_&_community/**

#### 현재 상태
- `app/(public)/stories/page.tsx` 존재
- `app/(public)/stories/[id]/page.tsx` 존재
- `app/(public)/stories/submit/page.tsx` 존재 (빌드 제외됨)

#### 템플릿 주요 요소
1. **Search Bar**
   - 검색 입력 + 검색 버튼
   - Sticky 검색바

2. **Category Filters**
   - 태그/카테고리 필터 버튼
   - 육아, 일상, 권익옹호, 성공사례

3. **Story Cards Masonry Grid**
   - 이미지 썸네일 (옵션)
   - 제목 + 발췌 + 작성자 + 날짜
   - 카테고리 뱃지

4. **Pagination**
   - 페이지 번호 네비게이션

#### 구현 필요 컴포넌트
- `SearchBar.tsx` - 검색바
- `CategoryFilter.tsx` - 카테고리 필터
- `StoryCardGrid.tsx` - 스토리 카드 그리드 (Masonry 레이아웃)
- `Pagination.tsx` - 페이지네이션

#### 기존 컴포넌트 개선
- 현재 `/stories` 페이지에 필터 및 검색 기능 추가
- Masonry 그리드 레이아웃 적용

#### 구현 우선순위
**Phase 2** (중요)

---

### 2.5 B2B Solutions for Partners → `/partners` (협력 기관)

**stitch_/b2b_solutions_for_partners/**

#### 현재 상태
- 생성 필요 (현재 존재하지 않음)

#### 템플릿 주요 요소
1. **Hero Section**
   - B2B 타겟 메시지
   - "전문인력 파견" 강조

2. **Service Offerings Grid**
   - 전문인력 파견 서비스 유형
   - 교사, 상담사, 돌봄 인력 등

3. **Partnership Benefits**
   - 협력 혜택 카드
   - 전문성, 신뢰성, 유연성, 비용 효율성

4. **Testimonials**
   - 협력 기관 후기
   - 기관명 + 담당자 + 후기

5. **Contact Form**
   - B2B 문의 양식
   - 기관명, 담당자, 연락처, 서비스 유형, 문의 내용

#### 구현 필요 컴포넌트
- `B2BHero.tsx` - B2B 히어로
- `OfferingCard.tsx` - 서비스 제공 카드
- `BenefitCard.tsx` - 혜택 카드
- `TestimonialCard.tsx` - 후기 카드
- `B2BContactForm.tsx` - B2B 문의 폼

#### 구현 우선순위
**Phase 2** (중요)

---

### 2.6 Support & Impact for Sponsors → `/support` (후원하기)

**stitch_/support_&_impact_for_sponsors/**

#### 현재 상태
- 생성 필요 (현재 존재하지 않음)

#### 템플릿 주요 요소
1. **Hero Section**
   - 후원 메시지
   - "함께 만드는 변화" 강조

2. **Impact Statistics**
   - 숫자로 보는 임팩트
   - 서비스 건수, 수혜 가족 수, 만족도 등
   - 애니메이션 카운터

3. **Donation Tiers**
   - 후원 금액별 혜택
   - 월 1만원, 3만원, 5만원, 10만원+
   - 카드 형태

4. **Social Impact Cards**
   - 후원금 사용처
   - 긴급돌봄, 교육, 상담, 여행 등

5. **Donation CTA**
   - 후원 버튼
   - 일회성/정기 선택

#### 구현 필요 컴포넌트
- `ImpactCounter.tsx` - 숫자 카운터 애니메이션
- `DonationTierCard.tsx` - 후원 등급 카드
- `ImpactCard.tsx` - 임팩트 카드
- `DonationForm.tsx` - 후원 폼

#### 구현 우선순위
**Phase 2** (중요)

---

## 3. 컴포넌트 구현 계획

### 3.1 공통 레이아웃 컴포넌트

#### `components/layout/`

**StickyHeader.tsx**
- 고정 헤더
- 로고 + 네비게이션 메뉴
- 모바일 햄버거 메뉴
- 다크모드 토글

**Footer.tsx**
- 조직 정보
- 퀵 링크
- 소셜 미디어
- 저작권 정보

**Container.tsx**
- 최대 너비 제한 래퍼
- Variants: `default` (max-w-7xl), `narrow` (max-w-4xl), `wide` (max-w-full)

**Section.tsx**
- 섹션 래퍼
- Vertical padding 관리
- Background variants

---

### 3.2 Hero 컴포넌트

#### `components/hero/`

**HeroSection.tsx**
- 기본 히어로 (그라디언트 배경)
- Props: title, subtitle, ctaText, ctaLink, backgroundImage?

**ImageHero.tsx**
- 이미지 배경 히어로
- 다크 오버레이
- Props: backgroundImage, title, subtitle

**MinimalHero.tsx**
- 심플 히어로 (텍스트 중심)
- Props: title, description

---

### 3.3 카드 컴포넌트

#### `components/cards/`

**PersonaCard.tsx**
- 페르소나별 카드 (가족/파트너/후원자)
- Icon + Title + Description + CTA
- Hover 효과

**ServiceCard.tsx**
- 서비스 소개 카드
- Icon + Title + Description + Link
- Badge (긴급돌봄 등 강조)

**StoryCard.tsx**
- 스토리 카드
- Thumbnail (옵션) + Title + Excerpt + Author + Date
- Category badge
- View count, like count (옵션)

**ImpactCard.tsx**
- 임팩트 카드
- Icon + Stat number + Description

**TestimonialCard.tsx**
- 후기 카드
- Quote + Author + Organization

**DonationTierCard.tsx**
- 후원 등급 카드
- Amount + Benefits list + CTA

---

### 3.4 폼 컴포넌트

#### `components/forms/`

**B2BContactForm.tsx**
- B2B 문의 폼
- 기관명, 담당자, 연락처, 서비스 유형, 내용

**DonationForm.tsx**
- 후원 신청 폼
- 금액 선택, 후원 유형 (일회성/정기), 결제 정보

**StorySubmitForm.tsx** (기존 개선)
- 현재 `/stories/submit` 페이지 디자인 개선
- 템플릿 스타일 적용

---

### 3.5 인터랙티브 컴포넌트

#### `components/interactive/`

**SearchBar.tsx**
- 검색 입력 + 버튼
- Sticky variant
- Props: onSearch, placeholder

**CategoryFilter.tsx**
- 카테고리 필터 버튼 그룹
- Active state
- Props: categories, activeCategory, onChange

**FAQAccordion.tsx**
- FAQ 아코디언
- 확장/축소 애니메이션
- Props: faqs[] (question, answer)

**Pagination.tsx**
- 페이지 네비게이션
- 이전/다음 버튼 + 페이지 번호
- Props: currentPage, totalPages, onPageChange

**ImpactCounter.tsx**
- 숫자 카운터 애니메이션
- Intersection Observer로 뷰포트 진입 시 애니메이션
- Props: target, duration, suffix

**Timeline.tsx**
- 타임라인 컴포넌트
- 세로형 연결선
- Props: events[] (year, title, description)

**ProcessFlow.tsx**
- 프로세스 플로우 다이어그램
- 스텝 번호 + 설명
- 연결 화살표
- Props: steps[] (number, title, description)

---

### 3.6 UI 기본 컴포넌트

#### `components/ui/`

**Badge.tsx** (신규)
- 뱃지 컴포넌트
- Variants: default, success, warning, error
- Sizes: sm, md, lg

**Button.tsx** (기존 개선)
- Variants: primary, secondary, outline, ghost
- Sizes: sm, md, lg, xl
- Loading state
- Icon support

**Input.tsx** (기존 개선)
- 텍스트 입력
- Error state
- Helper text

**Textarea.tsx** (기존 개선)
- 다중행 입력
- Auto-resize 옵션

**Select.tsx** (신규)
- 드롭다운 선택
- Custom styling

---

## 4. 우선순위 및 단계별 구현

### Phase 1: 핵심 페이지 (2-3주)

**목표**: 3개 페르소나가 메인 기능에 접근할 수 있는 최소 기능 구현

#### Week 1: 레이아웃 및 공통 컴포넌트
- [ ] `StickyHeader.tsx` - 고정 헤더
- [ ] `Footer.tsx` - 푸터
- [ ] `Container.tsx`, `Section.tsx` - 레이아웃 래퍼
- [ ] `Button.tsx`, `Badge.tsx` - 기본 UI 컴포넌트
- [ ] Tailwind config 업데이트 (색상, 폰트, 간격)

#### Week 2: 메인 랜딩 페이지
- [ ] `HeroSection.tsx` - 히어로
- [ ] `PersonaCard.tsx` - 페르소나 카드
- [ ] `ImpactStats.tsx` - 통계 섹션
- [ ] `StoryPreviewCard.tsx` - 스토리 미리보기
- [ ] `/` 페이지 리팩토링

#### Week 3: 서비스 소개 페이지
- [ ] `EmergencyHighlightBox.tsx` - 긴급돌봄 강조
- [ ] `ServiceCard.tsx` - 서비스 카드
- [ ] `ProcessFlow.tsx` - 프로세스 플로우
- [ ] `FAQAccordion.tsx` - FAQ
- [ ] `/services` 페이지 리팩토링

#### Week 3: 조직 소개 페이지
- [ ] `ImageHero.tsx` - 이미지 히어로
- [ ] `VMVCard.tsx` - Vision/Mission/Values 카드
- [ ] `Timeline.tsx` - 타임라인
- [ ] `/about` 페이지 신규 생성

---

### Phase 2: 확장 페이지 (2-3주)

**목표**: B2B 및 후원자 페이지 구현으로 3개 페르소나 완전 지원

#### Week 4: B2B 파트너 페이지
- [ ] `B2BHero.tsx`
- [ ] `OfferingCard.tsx`
- [ ] `BenefitCard.tsx`
- [ ] `TestimonialCard.tsx`
- [ ] `B2BContactForm.tsx`
- [ ] `/partners` 페이지 신규 생성

#### Week 5: 후원자 페이지
- [ ] `ImpactCounter.tsx` - 애니메이션 카운터
- [ ] `DonationTierCard.tsx`
- [ ] `ImpactCard.tsx`
- [ ] `DonationForm.tsx`
- [ ] `/support` 페이지 신규 생성

#### Week 6: 스토리 페이지 개선
- [ ] `SearchBar.tsx`
- [ ] `CategoryFilter.tsx`
- [ ] `StoryCardGrid.tsx` (Masonry 레이아웃)
- [ ] `Pagination.tsx`
- [ ] `/stories` 페이지 개선
- [ ] `/stories/submit` 페이지 빌드 오류 수정 및 디자인 개선

---

### Phase 3: 다크모드 및 접근성 (1주)

**목표**: 다크모드 완전 지원 및 WCAG 준수

#### Week 7: 다크모드 및 접근성
- [ ] 다크모드 토글 구현
- [ ] 모든 컴포넌트 다크모드 스타일링
- [ ] 키보드 네비게이션 개선
- [ ] ARIA 라벨 추가
- [ ] 색상 대비 검증 (WCAG AA)
- [ ] 스크린 리더 테스트

---

### Phase 4: 성능 최적화 및 애니메이션 (1주)

**목표**: 로딩 성능 및 UX 향상

#### Week 8: 최적화
- [ ] 이미지 최적화 (Next.js Image)
- [ ] Code splitting
- [ ] Lazy loading
- [ ] 애니메이션 추가 (Framer Motion 또는 Tailwind CSS)
- [ ] Lighthouse 스코어 90+ 달성

---

## 5. 기술 구현 방안

### 5.1 Tailwind CSS 설정

**tailwind.config.ts 확장**

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class', // 클래스 기반 다크모드
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary colors
        primary: {
          DEFAULT: '#2b8cee',
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#2b8cee', // Main
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        // Secondary colors
        success: '#7ED321',
        warning: '#F5A623',
        emergency: '#D32F2F',
      },
      fontFamily: {
        sans: ['Noto Sans KR', 'Inter', 'sans-serif'],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'counter': 'counter 2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/container-queries'),
  ],
}

export default config
```

---

### 5.2 컴포넌트 아키텍처

#### 디렉토리 구조

```
components/
├── layout/           # 레이아웃 컴포넌트
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Container.tsx
│   └── Section.tsx
├── hero/             # 히어로 컴포넌트
│   ├── HeroSection.tsx
│   ├── ImageHero.tsx
│   └── MinimalHero.tsx
├── cards/            # 카드 컴포넌트
│   ├── PersonaCard.tsx
│   ├── ServiceCard.tsx
│   ├── StoryCard.tsx
│   ├── ImpactCard.tsx
│   ├── TestimonialCard.tsx
│   └── DonationTierCard.tsx
├── forms/            # 폼 컴포넌트
│   ├── B2BContactForm.tsx
│   ├── DonationForm.tsx
│   └── StorySubmitForm.tsx
├── interactive/      # 인터랙티브 컴포넌트
│   ├── SearchBar.tsx
│   ├── CategoryFilter.tsx
│   ├── FAQAccordion.tsx
│   ├── Pagination.tsx
│   ├── ImpactCounter.tsx
│   ├── Timeline.tsx
│   └── ProcessFlow.tsx
└── ui/               # 기본 UI 컴포넌트
    ├── Badge.tsx
    ├── Button.tsx
    ├── Input.tsx
    ├── Textarea.tsx
    └── Select.tsx
```

---

### 5.3 상태 관리

#### 다크모드
- **Context API** 사용
- `components/providers/ThemeProvider.tsx`
- localStorage에 사용자 설정 저장

#### 폼 상태
- **React Hook Form** 사용 (이미 설치됨)
- Zod validation

#### 서버 상태
- **기존 fetch 패턴** 유지
- 필요시 React Query 도입 고려

---

### 5.4 애니메이션

#### 옵션 1: Tailwind CSS Animations
- 장점: 추가 라이브러리 불필요
- 단점: 복잡한 애니메이션 제한적

#### 옵션 2: Framer Motion
- 장점: 강력한 애니메이션, 제스처 지원
- 단점: 번들 크기 증가

**권장**: Phase 1-2는 Tailwind CSS, Phase 4에서 필요 시 Framer Motion 도입

---

### 5.5 이미지 최적화

- **Next.js Image 컴포넌트** 사용
- `public/images/` 디렉토리에 이미지 저장
- WebP 형식 사용
- Lazy loading 기본 활성화

---

### 5.6 접근성 체크리스트

- [ ] 모든 이미지에 alt 텍스트
- [ ] 키보드 네비게이션 지원
- [ ] ARIA 라벨 및 역할 추가
- [ ] 색상 대비 4.5:1 이상 (WCAG AA)
- [ ] 포커스 표시 명확
- [ ] 스크린 리더 테스트
- [ ] 폼 유효성 검사 오류 명확히 전달

---

## 6. 성공 지표

### 디자인 품질
- [ ] stitch_ 템플릿과 90% 이상 시각적 일치도
- [ ] 다크모드 완전 지원
- [ ] 모바일/태블릿/데스크탑 반응형

### 성능
- [ ] Lighthouse Performance 90+
- [ ] First Contentful Paint < 1.5s
- [ ] Largest Contentful Paint < 2.5s

### 접근성
- [ ] Lighthouse Accessibility 95+
- [ ] WCAG AA 준수
- [ ] 스크린 리더 호환

### 비즈니스
- [ ] 3개 페르소나별 전용 페이지 완성
- [ ] 주요 CTA 명확 (서비스 신청, B2B 문의, 후원)
- [ ] 사용자 피드백 긍정적

---

## 다음 단계

1. **Phase 1 착수**: 공통 컴포넌트 및 메인 랜딩 페이지부터 시작
2. **디자인 시스템 문서화**: Storybook 또는 별도 문서로 컴포넌트 라이브러리 관리
3. **정기 리뷰**: 주간 진행 상황 체크 및 우선순위 조정
4. **사용자 테스트**: Phase 2 완료 후 실제 사용자 피드백 수집

---

**문서 작성일**: 2025-01-19
**작성자**: Claude Code
**버전**: 1.0
