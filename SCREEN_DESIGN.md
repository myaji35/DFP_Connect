# DFP Connect 화면 디자인 명세서

## 개요

장애와가족플랫폼 사회적협동조합 웹사이트의 화면 디자인 명세서입니다.
이 문서는 6개의 주요 페이지에 대한 디자인 가이드라인과 구성 요소를 정의합니다.

## 디자인 시스템

### Tailwind CSS 설정

#### tailwind.config.js 설정

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // 클래스 기반 다크 모드
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        primary: {
          DEFAULT: '#4A90E2',
          50: '#EBF4FC',
          100: '#D7E9F9',
          200: '#AFD3F3',
          300: '#87BDED',
          400: '#5FA7E7',
          500: '#4A90E2',
          600: '#2B73C6',
          700: '#205696',
          800: '#163966',
          900: '#0B1C33',
        },
        // Secondary Colors
        secondary: {
          DEFAULT: '#F5A623',
          50: '#FEF6E7',
          100: '#FDEDCF',
          200: '#FBDB9F',
          300: '#F9C96F',
          400: '#F7B73F',
          500: '#F5A623',
          600: '#D18A0F',
          700: '#9D670B',
          800: '#694408',
          900: '#352204',
        },
        // Emergency/Alert Color
        emergency: {
          DEFAULT: '#D32F2F',
          50: '#FDEAEA',
          100: '#FBD5D5',
          200: '#F7ABAB',
          300: '#F38181',
          400: '#EF5757',
          500: '#D32F2F',
          600: '#B32626',
          700: '#861C1C',
          800: '#5A1313',
          900: '#2D0909',
        },
        // Background Colors
        background: {
          light: '#F6F7F8',
          dark: '#101922',
        },
        // Text Colors
        text: {
          light: '#0D141B',
          dark: '#F6F7F8',
          'light-secondary': '#4C739A',
          'dark-secondary': '#A0B4C8',
        },
        // Border Colors
        border: {
          light: '#CFDBE7',
          dark: '#344252',
        },
      },
      fontFamily: {
        display: ['var(--font-noto-sans-kr)', 'Inter', 'sans-serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],      // 12px
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],   // 14px
        'base': ['1rem', { lineHeight: '1.5rem' }],      // 16px
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],   // 18px
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],    // 20px
        '2xl': ['1.5rem', { lineHeight: '2rem' }],       // 24px
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],  // 30px
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],    // 36px
        '5xl': ['3rem', { lineHeight: '1' }],            // 48px
        '6xl': ['3.75rem', { lineHeight: '1' }],         // 60px
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        DEFAULT: '0.25rem',   // 4px
        'lg': '0.5rem',       // 8px
        'xl': '0.75rem',      // 12px
        '2xl': '1rem',        // 16px
        '3xl': '1.5rem',      // 24px
        'full': '9999px',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        'xl': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
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
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
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
```

### 색상 팔레트

#### 주 색상 (Primary)
- **Primary**: `#4A90E2` (파란색 계열)
- **사용 예**: `bg-primary`, `text-primary-500`, `border-primary-300`
- **Tailwind 클래스**:
  - `bg-primary` - 기본 배경색
  - `text-primary` - 기본 텍스트 색상
  - `border-primary` - 기본 경계선 색상
  - `hover:bg-primary-600` - 호버 시 진한 색상
  - `bg-primary/90` - 90% 투명도

#### 보조 색상 (Secondary)
- **Secondary**: `#F5A623` (주황색/노란색 계열)
- **사용 예**: `bg-secondary`, `text-secondary-500`
- **용도**: CTA 버튼, 강조 요소, 후원 관련 요소

#### 긴급 색상 (Emergency)
- **Emergency**: `#D32F2F` (빨간색 - 긴급 돌봄용)
- **사용 예**: `bg-emergency`, `text-emergency`, `border-emergency`
- **용도**: 긴급 돌봄 섹션, 경고 메시지

#### 배경 색상
- **Light Mode**: `#F6F7F8`
  - Tailwind: `bg-background-light`
- **Dark Mode**: `#101922`
  - Tailwind: `dark:bg-background-dark`

#### 텍스트 색상
- **Light Mode Text**: `#0D141B`
  - Tailwind: `text-text-light`
- **Dark Mode Text**: `#F6F7F8`
  - Tailwind: `dark:text-text-dark`
- **Subtext Light**: `#4C739A`
  - Tailwind: `text-text-light-secondary`
- **Subtext Dark**: `#A0B4C8`
  - Tailwind: `dark:text-text-dark-secondary`

#### 경계선 색상
- **Light Mode Border**: `#CFDBE7`
  - Tailwind: `border-border-light`
- **Dark Mode Border**: `#344252`
  - Tailwind: `dark:border-border-dark`

### 타이포그래피

#### 폰트 패밀리
```css
font-family: 'Noto Sans KR', 'Inter', sans-serif;
```

#### 폰트 크기
- **Heading 1**: `text-4xl` (36px) ~ `text-5xl` (48px) / `font-black`
- **Heading 2**: `text-3xl` (30px) / `font-bold`
- **Heading 3**: `text-2xl` (24px) ~ `text-[22px]` / `font-bold`
- **Body Large**: `text-base` (16px) ~ `text-lg` (18px)
- **Body Small**: `text-sm` (14px)
- **Caption**: `text-xs` (12px)

### 아이콘 시스템
- **라이브러리**: Material Symbols Outlined
- **기본 크기**: 24px (opsz 24)
- **가변 설정**: FILL 0, wght 400, GRAD 0

### 레이아웃

#### 반응형 브레이크포인트
- **Mobile**: < 640px
- **Tablet**: 640px ~ 1024px
- **Desktop**: > 1024px

#### 컨테이너 최대 너비
- **Standard**: `max-w-[960px]`
- **Wide**: `max-w-5xl` (1024px)
- **Extra Wide**: `max-w-6xl` (1152px)
- **Full Width**: `max-w-7xl` (1280px)

#### 여백 (Padding)
- **Mobile**: `px-4`
- **Tablet**: `px-8` ~ `px-10`
- **Desktop**: `px-16` ~ `px-24` ~ `px-40`

### 컴포넌트 스타일

#### 버튼 (Button Components)

##### Primary Button
```jsx
// 기본 Primary 버튼
<button className="
  inline-flex items-center justify-center
  rounded-lg h-10 px-4
  bg-primary text-white font-bold text-sm
  hover:bg-primary-600 active:bg-primary-700
  focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
  transition-colors duration-200
  disabled:opacity-50 disabled:cursor-not-allowed
">
  버튼 텍스트
</button>

// Large Primary 버튼
<button className="
  inline-flex items-center justify-center
  rounded-lg h-12 px-6
  bg-primary text-white font-bold text-base
  hover:bg-primary-600 active:bg-primary-700
  focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
  transition-colors duration-200
">
  버튼 텍스트
</button>
```

##### Secondary Button
```jsx
<button className="
  inline-flex items-center justify-center
  rounded-lg h-10 px-4
  bg-secondary text-white font-bold text-sm
  hover:bg-secondary-600 active:bg-secondary-700
  focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2
  transition-colors duration-200
">
  후원하기
</button>
```

##### Emergency Button
```jsx
<button className="
  inline-flex items-center justify-center gap-2
  rounded-lg h-12 px-6
  bg-emergency text-white font-bold text-base
  hover:bg-emergency-600 active:bg-emergency-700
  focus:outline-none focus:ring-2 focus:ring-emergency focus:ring-offset-2
  transition-colors duration-200
">
  <span className="material-symbols-outlined">send</span>
  긴급 요청 제출
</button>
```

##### Outline Button
```jsx
<button className="
  inline-flex items-center justify-center
  rounded-lg h-10 px-4
  bg-transparent border-2 border-primary
  text-primary font-bold text-sm
  hover:bg-primary hover:text-white
  focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
  transition-all duration-200
">
  더 알아보기
</button>
```

##### Ghost Button
```jsx
<button className="
  inline-flex items-center justify-center
  rounded-lg h-10 px-4
  bg-slate-100 dark:bg-slate-800
  text-text-light dark:text-text-dark font-bold text-sm
  hover:bg-slate-200 dark:hover:bg-slate-700
  focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2
  transition-colors duration-200
">
  로그인
</button>
```

#### 카드 (Card Components)

##### 기본 카드
```jsx
<div className="
  rounded-xl border border-border-light dark:border-border-dark
  bg-white dark:bg-slate-900
  p-6
  shadow-sm hover:shadow-lg
  transition-shadow duration-300
">
  {/* 카드 내용 */}
</div>
```

##### 인터랙티브 카드 (클릭 가능)
```jsx
<div className="
  rounded-xl border border-border-light dark:border-border-dark
  bg-white dark:bg-slate-900
  p-6
  shadow-sm hover:shadow-lg
  transition-all duration-300
  cursor-pointer
  hover:scale-105 hover:-translate-y-1
">
  {/* 카드 내용 */}
</div>
```

##### 아이콘 카드
```jsx
<div className="
  flex flex-col gap-4
  rounded-xl border border-border-light dark:border-border-dark
  bg-white dark:bg-slate-900
  p-6
  shadow-sm hover:shadow-lg
  transition-shadow duration-300
">
  <div className="
    flex items-center justify-center
    size-12 rounded-full
    bg-primary/20 text-primary
  ">
    <span className="material-symbols-outlined text-3xl">visibility</span>
  </div>
  <div className="flex flex-col gap-2">
    <h3 className="text-lg font-bold text-text-light dark:text-text-dark">
      카드 제목
    </h3>
    <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
      카드 설명 내용입니다.
    </p>
  </div>
</div>
```

#### 폼 요소 (Form Components)

##### 텍스트 입력
```jsx
<div className="space-y-2">
  <label
    htmlFor="name"
    className="block text-sm font-medium text-text-light dark:text-text-dark"
  >
    이름
  </label>
  <input
    type="text"
    id="name"
    className="
      block w-full
      rounded-lg border border-slate-300 dark:border-slate-600
      bg-white dark:bg-slate-800
      px-4 py-3
      text-text-light dark:text-text-dark
      placeholder:text-slate-400 dark:placeholder:text-slate-500
      focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-50
      transition-colors duration-200
    "
    placeholder="홍길동"
  />
</div>
```

##### Textarea
```jsx
<div className="space-y-2">
  <label
    htmlFor="message"
    className="block text-sm font-medium text-text-light dark:text-text-dark"
  >
    메시지
  </label>
  <textarea
    id="message"
    rows={4}
    className="
      block w-full
      rounded-lg border border-slate-300 dark:border-slate-600
      bg-white dark:bg-slate-800
      px-4 py-3
      text-text-light dark:text-text-dark
      placeholder:text-slate-400 dark:placeholder:text-slate-500
      focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-50
      resize-none
      transition-colors duration-200
    "
    placeholder="문의 내용을 입력해주세요"
  />
</div>
```

##### 검색 입력
```jsx
<div className="relative">
  <div className="
    absolute inset-y-0 left-0
    flex items-center pl-4
    pointer-events-none
  ">
    <span className="material-symbols-outlined text-slate-400">search</span>
  </div>
  <input
    type="search"
    className="
      block w-full
      rounded-lg border border-slate-300 dark:border-slate-600
      bg-white dark:bg-slate-800
      pl-12 pr-4 py-3
      text-text-light dark:text-text-dark
      placeholder:text-slate-400
      focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-50
      transition-colors duration-200
    "
    placeholder="키워드로 이야기 검색"
  />
</div>
```

#### 뱃지 (Badge Components)

##### 카테고리 뱃지
```jsx
<span className="
  inline-flex items-center
  rounded-full
  bg-primary/20 dark:bg-primary/30
  px-3 py-1
  text-xs font-medium text-primary
">
  양육
</span>
```

##### 상태 뱃지
```jsx
// 성공
<span className="
  inline-flex items-center
  rounded-full
  bg-green-100 dark:bg-green-900/30
  px-3 py-1
  text-xs font-medium text-green-800 dark:text-green-300
">
  완료
</span>

// 경고
<span className="
  inline-flex items-center
  rounded-full
  bg-yellow-100 dark:bg-yellow-900/30
  px-3 py-1
  text-xs font-medium text-yellow-800 dark:text-yellow-300
">
  대기중
</span>

// 에러
<span className="
  inline-flex items-center
  rounded-full
  bg-emergency-100 dark:bg-emergency-900/30
  px-3 py-1
  text-xs font-medium text-emergency-800 dark:text-emergency-300
">
  긴급
</span>
```

#### 네비게이션 (Navigation Components)

##### Header/Navbar
```jsx
<header className="
  sticky top-0 z-50
  w-full
  bg-white/80 dark:bg-slate-900/80
  backdrop-blur-sm
  border-b border-border-light dark:border-border-dark
">
  <div className="
    container mx-auto
    px-4 sm:px-6 lg:px-8
    flex items-center justify-between
    h-16
  ">
    {/* Logo */}
    <div className="flex items-center gap-4">
      <div className="size-6 text-primary">
        {/* Logo SVG */}
      </div>
      <h2 className="text-lg font-bold text-text-light dark:text-text-dark">
        장애와가족플랫폼
      </h2>
    </div>

    {/* Desktop Navigation */}
    <nav className="hidden md:flex items-center gap-8">
      <a
        href="#"
        className="
          text-sm font-medium
          text-text-light dark:text-text-dark
          hover:text-primary
          transition-colors duration-200
        "
      >
        소개
      </a>
      {/* More nav items */}
    </nav>

    {/* Mobile Menu Button */}
    <button className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
      <span className="material-symbols-outlined">menu</span>
    </button>
  </div>
</header>
```

##### Breadcrumb
```jsx
<nav className="flex items-center gap-2 text-sm" aria-label="Breadcrumb">
  <a
    href="/"
    className="
      text-text-light-secondary dark:text-text-dark-secondary
      hover:text-primary
      transition-colors duration-200
    "
  >
    홈
  </a>
  <span className="material-symbols-outlined text-xs text-slate-400">
    chevron_right
  </span>
  <a
    href="/services"
    className="
      text-text-light-secondary dark:text-text-dark-secondary
      hover:text-primary
      transition-colors duration-200
    "
  >
    서비스
  </a>
  <span className="material-symbols-outlined text-xs text-slate-400">
    chevron_right
  </span>
  <span className="text-text-light dark:text-text-dark font-medium">
    긴급 돌봄
  </span>
</nav>
```

##### Tab Navigation
```jsx
<div className="flex items-center gap-2 overflow-x-auto">
  <button className="
    flex-shrink-0
    h-10 px-4
    rounded-lg
    bg-primary text-white
    text-sm font-medium
    transition-colors duration-200
  ">
    전체 서비스
  </button>
  <button className="
    flex-shrink-0
    h-10 px-4
    rounded-lg
    bg-slate-100 dark:bg-slate-800
    text-text-light dark:text-text-dark
    hover:bg-slate-200 dark:hover:bg-slate-700
    text-sm font-medium
    transition-colors duration-200
  ">
    돌봄
  </button>
  {/* More tabs */}
</div>
```

#### 모달 & 오버레이 (Modal & Overlay Components)

##### 모달
```jsx
{/* Overlay */}
<div className="
  fixed inset-0 z-50
  bg-black/50
  backdrop-blur-sm
  flex items-center justify-center
  p-4
">
  {/* Modal */}
  <div className="
    relative
    w-full max-w-lg
    bg-white dark:bg-slate-900
    rounded-2xl
    shadow-2xl
    p-6
    animate-slide-up
  ">
    {/* Close Button */}
    <button className="
      absolute top-4 right-4
      p-2 rounded-lg
      text-slate-400 hover:text-text-light
      hover:bg-slate-100 dark:hover:bg-slate-800
      transition-colors duration-200
    ">
      <span className="material-symbols-outlined">close</span>
    </button>

    {/* Modal Content */}
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-text-light dark:text-text-dark">
        모달 제목
      </h2>
      <p className="text-text-light-secondary dark:text-text-dark-secondary">
        모달 내용입니다.
      </p>
    </div>
  </div>
</div>
```

#### 알림 & 토스트 (Alert & Toast Components)

##### Alert
```jsx
// Success Alert
<div className="
  flex items-start gap-3
  rounded-lg
  bg-green-50 dark:bg-green-900/20
  border border-green-200 dark:border-green-800
  p-4
">
  <span className="material-symbols-outlined text-green-600">check_circle</span>
  <div className="flex-1">
    <h4 className="font-bold text-green-900 dark:text-green-100">
      성공
    </h4>
    <p className="text-sm text-green-700 dark:text-green-300">
      요청이 성공적으로 처리되었습니다.
    </p>
  </div>
</div>

// Error Alert
<div className="
  flex items-start gap-3
  rounded-lg
  bg-emergency-50 dark:bg-emergency-900/20
  border border-emergency-200 dark:border-emergency-800
  p-4
">
  <span className="material-symbols-outlined text-emergency">error</span>
  <div className="flex-1">
    <h4 className="font-bold text-emergency-900 dark:text-emergency-100">
      오류
    </h4>
    <p className="text-sm text-emergency-700 dark:text-emergency-300">
      요청 처리 중 오류가 발생했습니다.
    </p>
  </div>
</div>
```

### 레이아웃 패턴 (Layout Patterns)

#### Container 패턴
```jsx
// Standard Container
<div className="
  container mx-auto
  px-4 sm:px-6 lg:px-8
  max-w-7xl
">
  {/* Content */}
</div>

// Narrow Container (for reading content)
<div className="
  container mx-auto
  px-4 sm:px-6 lg:px-8
  max-w-3xl
">
  {/* Content */}
</div>

// Wide Container
<div className="
  w-full
  px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40
">
  {/* Content */}
</div>
```

#### Grid 레이아웃
```jsx
// Auto-fit Grid (responsive)
<div className="
  grid
  grid-cols-[repeat(auto-fit,minmax(280px,1fr))]
  gap-6
">
  {/* Grid items */}
</div>

// Fixed Column Grid
<div className="
  grid
  grid-cols-1
  md:grid-cols-2
  lg:grid-cols-3
  gap-6
">
  {/* Grid items */}
</div>

// Asymmetric Grid
<div className="
  grid
  grid-cols-1
  md:grid-cols-3
  gap-6
">
  <div className="md:col-span-2">
    {/* Main content */}
  </div>
  <div className="md:col-span-1">
    {/* Sidebar */}
  </div>
</div>
```

#### Flexbox 레이아웃
```jsx
// Centered Content
<div className="
  flex
  items-center
  justify-center
  min-h-screen
">
  {/* Centered content */}
</div>

// Space Between Layout
<div className="
  flex
  items-center
  justify-between
  gap-4
">
  {/* Items */}
</div>

// Stack Layout
<div className="
  flex
  flex-col
  gap-6
">
  {/* Stacked items */}
</div>
```

#### Section 레이아웃
```jsx
// Hero Section
<section className="
  relative
  min-h-[400px] md:min-h-[520px]
  flex items-center justify-center
  bg-cover bg-center bg-no-repeat
  px-4 py-16
  before:absolute before:inset-0
  before:bg-gradient-to-b before:from-black/20 before:to-black/60
">
  <div className="relative z-10 max-w-3xl mx-auto text-center text-white">
    <h1 className="text-4xl md:text-5xl font-black mb-4">
      히어로 제목
    </h1>
    <p className="text-lg mb-8">
      히어로 설명
    </p>
    <button className="btn-primary">
      CTA 버튼
    </button>
  </div>
</section>

// Content Section
<section className="
  py-16 md:py-24
  bg-background-light dark:bg-background-dark
">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className="text-3xl font-bold text-center mb-12">
      섹션 제목
    </h2>
    {/* Content */}
  </div>
</section>
```

### 반응형 유틸리티 클래스

#### 반응형 디스플레이
```jsx
// Mobile: hidden, Desktop: shown
<div className="hidden md:block">
  데스크톱에서만 표시
</div>

// Mobile: shown, Desktop: hidden
<div className="block md:hidden">
  모바일에서만 표시
</div>

// Conditional display
<div className="
  hidden
  sm:block
  lg:flex
  xl:grid
">
  반응형 디스플레이
</div>
```

#### 반응형 텍스트
```jsx
<h1 className="
  text-3xl
  sm:text-4xl
  md:text-5xl
  lg:text-6xl
  font-black
">
  반응형 제목
</h1>

<p className="
  text-sm
  md:text-base
  lg:text-lg
">
  반응형 본문
</p>
```

#### 반응형 간격
```jsx
<div className="
  px-4
  sm:px-6
  md:px-8
  lg:px-12
  xl:px-16
">
  반응형 패딩
</div>

<div className="
  space-y-4
  md:space-y-6
  lg:space-y-8
">
  {/* 자식 요소 간 반응형 간격 */}
</div>
```

#### 반응형 레이아웃
```jsx
// Stack on mobile, row on desktop
<div className="
  flex
  flex-col
  md:flex-row
  gap-4
">
  <div>항목 1</div>
  <div>항목 2</div>
</div>

// Different alignments
<div className="
  flex
  items-start
  md:items-center
  justify-start
  md:justify-between
">
  {/* Content */}
</div>
```

### 다크 모드 구현

#### 페이지 레벨 다크 모드 토글
```jsx
// app/layout.tsx
'use client'

import { ThemeProvider } from 'next-themes'

export default function RootLayout({ children }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

#### 다크 모드 토글 버튼
```jsx
'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="
        p-2 rounded-lg
        bg-slate-100 dark:bg-slate-800
        text-text-light dark:text-text-dark
        hover:bg-slate-200 dark:hover:bg-slate-700
        transition-colors duration-200
      "
    >
      <span className="material-symbols-outlined">
        {theme === 'dark' ? 'light_mode' : 'dark_mode'}
      </span>
    </button>
  )
}
```

### 애니메이션 & 트랜지션

#### 페이드 인 애니메이션
```jsx
<div className="
  opacity-0
  animate-fade-in
">
  페이드 인 컨텐츠
</div>
```

#### 슬라이드 업 애니메이션
```jsx
<div className="
  translate-y-8 opacity-0
  animate-slide-up
">
  슬라이드 업 컨텐츠
</div>
```

#### 호버 효과
```jsx
// Scale up on hover
<div className="
  transition-transform duration-300
  hover:scale-105
">
  호버 시 확대
</div>

// Lift up on hover
<div className="
  transition-all duration-300
  hover:-translate-y-2
  hover:shadow-xl
">
  호버 시 들어올림
</div>

// Color change on hover
<a className="
  text-text-light-secondary
  hover:text-primary
  transition-colors duration-200
">
  링크
</a>
```

#### 로딩 스피너
```jsx
<div className="
  inline-block
  size-8
  border-4 border-slate-200
  border-t-primary
  rounded-full
  animate-spin
">
</div>
```

### 접근성 (Accessibility) 클래스

#### 스크린 리더 전용
```jsx
<span className="sr-only">
  스크린 리더에서만 읽히는 텍스트
</span>
```

#### Focus 스타일
```jsx
<button className="
  focus:outline-none
  focus:ring-2
  focus:ring-primary
  focus:ring-offset-2
  focus:ring-offset-white
  dark:focus:ring-offset-slate-900
">
  포커스 가능한 버튼
</button>
```

#### Skip to Content
```jsx
<a
  href="#main-content"
  className="
    sr-only
    focus:not-sr-only
    focus:absolute
    focus:top-4
    focus:left-4
    focus:z-50
    focus:px-4
    focus:py-2
    focus:bg-primary
    focus:text-white
    focus:rounded-lg
  "
>
  본문으로 건너뛰기
</a>
```

### 유틸리티 클래스 조합 패턴

#### Aspect Ratio (이미지/비디오)
```jsx
// 16:9 Aspect Ratio
<div className="
  relative
  w-full
  aspect-video
  bg-slate-200 dark:bg-slate-800
  rounded-lg
  overflow-hidden
">
  <img
    src="/image.jpg"
    alt="Description"
    className="absolute inset-0 w-full h-full object-cover"
  />
</div>

// 1:1 Aspect Ratio (Square)
<div className="
  relative
  w-full
  aspect-square
  rounded-full
  overflow-hidden
">
  <img
    src="/profile.jpg"
    alt="Profile"
    className="absolute inset-0 w-full h-full object-cover"
  />
</div>
```

#### Truncate Text
```jsx
// Single line truncate
<p className="
  truncate
  max-w-xs
">
  매우 긴 텍스트가 잘립니다...
</p>

// Multi-line truncate
<p className="
  line-clamp-3
">
  여러 줄의 텍스트를 3줄까지만 표시하고
  나머지는 ... 으로 표시합니다.
</p>
```

#### Backdrop Blur
```jsx
<div className="
  fixed inset-0
  bg-black/30
  backdrop-blur-md
">
  블러 처리된 배경
</div>
```

#### Gradient Background
```jsx
// Linear Gradient
<div className="
  bg-gradient-to-r
  from-primary
  to-secondary
  text-white
  p-8
">
  그라데이션 배경
</div>

// Gradient Text
<h1 className="
  text-4xl font-black
  bg-gradient-to-r
  from-primary
  to-secondary
  bg-clip-text
  text-transparent
">
  그라데이션 텍스트
</h1>
```

---

## 페이지별 화면 구성

## 1. 메인 랜딩 페이지 (Main Landing Page)

**파일 경로**: `stitch_/main_landing_page/code.html`

### 페이지 구조

#### Header (고정 헤더)
- **위치**: Sticky top (스크롤 시 상단 고정)
- **배경**: 반투명 배경 + Backdrop blur
- **구성**:
  - 로고 아이콘 (groups icon) + "사회적 협동조합 허브"
  - 네비게이션 메뉴: 소개, 우리의 미션, 문의하기
  - 로그인 버튼 (Primary)
  - 모바일 햄버거 메뉴

#### Hero Section
- **제목**: "우리 커뮤니티 허브에 오신 것을 환영합니다"
  - `text-4xl md:text-5xl font-black`
- **부제**: "가족, 파트너, 후원자를 연결하여 더 포용적인 미래를 만들어갑니다."
  - `text-base md:text-lg`
- **정렬**: 중앙 정렬, 최대 너비 `max-w-3xl`

#### Three Personas Cards (핵심 섹션)
**레이아웃**: `grid-cols-1 md:grid-cols-3 gap-8`

##### 1. 장애인 가족 카드
- **아이콘**: family_restroom (Primary 색상 배경)
- **제목**: 장애인 가족
- **설명**: 지원 서비스를 이용하고, 다른 가족과 교류하며, 맞춤형 행사를 찾아보세요.
- **CTA**: "자료 살펴보기" (Primary 버튼)

##### 2. 협력 기관 카드
- **아이콘**: handshake (Teal 색상 배경)
- **제목**: 협력 기관
- **설명**: 자원을 공유하고, 추천을 관리하며, 커뮤니티와 협력하여 영향력을 확대하세요.
- **CTA**: "파트너 포털" (Dark 버튼)

##### 3. 후원 파트너 카드
- **아이콘**: volunteer_activism (Orange 색상 배경)
- **제목**: 후원 파트너
- **설명**: 영향 보고서를 확인하고, 후원 기회를 발견하며, 투명하게 기여를 관리하세요.
- **CTA**: "후원 알아보기" (Dark 버튼)

**카드 스타일**:
```css
rounded-xl border bg-white dark:bg-slate-900 p-6
shadow-sm hover:shadow-lg transition-shadow
```

#### Footer
- **배경**: `bg-white dark:bg-slate-900`
- **상단 경계선**: `border-t`
- **구성**:
  - 좌측: 로고 + 저작권 정보
  - 우측: 개인정보처리방침, 서비스 이용약관, 접근성

---

## 2. 소개 및 비전 페이지 (About Us & Vision)

**파일 경로**: `stitch_/about_us_&_vision/code.html`

### 페이지 구조

#### Header
- **로고**: 다이아몬드 형태의 SVG 아이콘
- **네비게이션**: 홈, **소개**(active), 주요사업, 파트너, 문의
- **CTA**: "후원하기" 버튼

#### Hero Banner
- **배경**: 이미지 + 그라데이션 오버레이
  ```css
  linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.5) 100%)
  ```
- **최소 높이**: `min-h-[520px]`
- **제목**: "장애와가족플랫폼 사회적협동조합" (흰색, `text-4xl md:text-5xl`)
- **부제**: "공동체 중심의 사회적 돌봄체계를 통해 가족을 연결하고 지원합니다."
- **CTA**: "함께하기" 버튼

#### Vision, Mission, Values Section
**제목**: "비전, 미션, 그리고 가치"

**레이아웃**: `grid-cols-1 md:grid-cols-3 gap-6`

##### 3개 카드
1. **우리의 비전**
   - 아이콘: visibility (원형 Primary 배경)
   - 내용: 완전한 포용 사회 구축

2. **우리의 미션**
   - 아이콘: track_changes
   - 내용: 협력을 통한 지속 가능한 돌봄체계 구축

3. **핵심 가치**
   - 아이콘: favorite
   - 내용: 공감, 협력, 투명성

#### Timeline (연혁)
**스타일**: 세로 타임라인, 좌측 Primary 색상 라인

**구성**:
- 2018년 - 설립
- 2020년 - 첫 커뮤니티 센터 개소
- 2022년 - '사회적 돌봄체계 구축' 사업 착수
- 2024년 - 500가구 이상 지원 달성

**요소 스타일**:
```css
/* 타임라인 라인 */
border-l-2 border-primary/30

/* 타임라인 포인트 */
size-5 rounded-full bg-primary
ring-8 ring-background-light
```

#### Core Program Highlight
- **배경**: `bg-primary/10 dark:bg-primary/20`
- **제목**: "우리의 핵심 사업: 사회적 돌봄체계 구축"
- **설명**: 가족, 지방 정부, 서비스 제공자 연결
- **CTA**: "자세히 알아보기"

#### Team Introduction
**제목**: "우리 팀을 소개합니다"

**레이아웃**: `grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8`

**프로필 카드**:
- 원형 프로필 이미지 (`rounded-full size-40`)
- 이름 (`font-bold text-lg`)
- 직책 (`text-primary text-sm font-medium`)

**예시 팀원**:
- 김민준 - 이사장
- 이서연 - 사업 본부장
- 박지훈 - 대외협력 팀장

---

## 3. 가족 서비스 개요 (Family Services Overview)

**파일 경로**: `stitch_/family_services_overview/code.html`

### 페이지 구조

#### Header
- **로고**: 박스 형태 SVG 아이콘
- **네비게이션**: 홈, 소개, **서비스**(active), 파트너, 문의
- **CTA**: "후원하기" + "로그인"

#### Hero Section
**레이아웃**: Container Query 반응형 (@container)

- **좌측**: 텍스트 콘텐츠
  - 제목: "장애인 가족을 위한 든든한 지원"
  - 설명: 전문 서비스 제공 안내
- **우측**: 배경 이미지 (aspect-video)

#### Emergency Care Section (긴급 돌봄)
**강조 스타일**:
```css
bg-red-50 dark:bg-red-900/20
rounded-xl border-2 border-dashed border-secondary
```

**구성**:
- **아이콘**: SOS (빨간색, `text-4xl`)
- **제목**: "긴급 돌봄이 필요하신가요?"
- **폼 필드**:
  - 이름 (text)
  - 연락처 (tel)
  - 긴급 상황 설명 (textarea)
- **제출 버튼**: "긴급 요청 제출" (Secondary 색상)

#### Service Filter Tabs
**레이아웃**: 가로 스크롤 가능한 탭

**탭 목록**:
- 전체 서비스 (Active - Primary 배경)
- 돌봄
- 치료
- 상담
- 여행

#### Service Cards Grid
**레이아웃**: `grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6`

##### 서비스 카드 구성
1. **긴급 돌봄**
   - 이미지: 응급 키트
   - 설명: 가장 필요할 때 즉시 제공되는 지원

2. **방과 후 가정 치료**
   - 이미지: 치료사와 아이
   - 설명: 집에서 편안하게 받는 치료 활동

3. **개인/가족 상담**
   - 이미지: 상담 세션
   - 설명: 전문적인 심리 지원

4. **맞춤형 여행**
   - 이미지: 여행 밴
   - 설명: 접근 가능한 여행 경험

**카드 스타일**:
```css
rounded-xl border bg-white dark:bg-slate-900 p-4
shadow-sm
```

#### Expert Consultation CTA
- **배경**: `bg-white dark:bg-slate-900 rounded-xl`
- **제목**: "도움이 필요하신가요? 전문가와 상담하세요"
- **설명**: 무료 상담 안내
- **CTA**: "문의하기" 버튼

---

## 4. 가족 이야기 & 커뮤니티 (Family Stories & Community)

**파일 경로**: `stitch_/family_stories_&_community/code.html`

### 페이지 구조

#### Header
- **네비게이션**: 홈, 소개, 서비스, **가족 이야기**(active), 파트너, 문의
- **CTA**: "후원하기" (Secondary) + "로그인" (Primary)

#### Hero Banner
**배경**: 그라데이션 오버레이 + 가족 이미지
```css
background-image: linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.5) 100%)
min-h-[400px]
```

- **제목**: "함께하는 여정, 함께하는 힘"
- **부제**: "우리 가족 공동체가 경험과 이야기를 통해 서로 연결되고, 배우고, 성장하는 공간입니다."

#### Search & Filter Bar (Sticky)
**위치**: `sticky top-[61px]` (헤더 아래 고정)

**구성**:
- **검색바**:
  - 아이콘: search
  - 플레이스홀더: "키워드로 이야기 검색"
- **필터 버튼**: 양육, 일상생활, 권익옹호, 성공사례
  - 드롭다운 아이콘: expand_more

#### Story Cards Grid
**레이아웃**: `grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6`

##### 스토리 카드 구성
- **이미지**: aspect-video, 상단
- **카테고리 태그**: `rounded-full bg-primary/20 px-3 py-1 text-xs`
- **제목**: `text-lg font-bold`
- **요약**: `text-sm text-slate-600`
- **메타 정보**: 작성자 • 작성일

**예시 스토리**:
1. "우리의 새로운 일상을 찾아서" - 양육
2. "작은 승리들로 가득한 하루" - 성공사례
3. "학교 시스템 이해하기" - 권익옹호
4. "공동체 지지의 힘" - 일상생활
5. "성장의 순간들을 축하하며" - 성공사례
6. "기술과 함께한 우리의 여정" - 일상생활

#### Share Your Story CTA
**배경**: `bg-primary/20 dark:bg-primary/30 rounded-xl`

- **제목**: "당신의 이야기는 소중합니다."
- **설명**: "당신의 경험을 공유하여 더 강한 커뮤니티를 만드는 데 도움을 주세요."
- **CTA**: "사연 보내기" (Secondary 버튼)

#### Pagination
**스타일**: 중앙 정렬, 번호 + 이전/다음 버튼

```css
/* Active Page */
bg-primary text-white border-primary

/* Inactive Page */
bg-neutral-light text-text-light border-slate-300
hover:bg-slate-100
```

---

## 5. B2B 협력 기관 솔루션 (B2B Solutions for Partners)

**파일 경로**: `stitch_/b2b_solutions_for_partners/code.html`

### 페이지 구조

#### Header
- **네비게이션**: 홈, 가족 지원, 조합 소개, **기관 협력**(active)
- **CTA**: "파트너 문의"

#### Hero Banner
**배경**: 회의실 협업 이미지 + 다크 그라데이션
```css
background-image: linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.6) 100%)
min-h-[480px]
```

- **제목**: "전문적인 지원으로 기관의 역량을 강화하세요"
- **부제**: "장애인을 위한 돌봄 서비스를 향상시키고 기관의 팀을 지원하기 위해 전문 인력과 컨설팅을 제공합니다."
- **CTA**: "더 알아보기"

#### Services for Organizations Section
**제목**: "기관을 위한 서비스"

**레이아웃**: `grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3`

##### 4개 서비스 카드
1. **전문 인력 파견**
   - 아이콘: groups
   - 설명: 훈련되고 검증된 전문가 네트워크

2. **전문가 컨설팅**
   - 아이콘: support_agent
   - 설명: 최상의 실무에 대한 통찰력과 지침

3. **맞춤형 워크숍**
   - 아이콘: model_training
   - 설명: 맞춤형 교육 세션

4. **프로그램 개발**
   - 아이콘: developer_mode
   - 설명: 효과적인 신규 프로그램 설계 및 실행

#### Partnership Benefits
**제목**: "파트너십의 이점"

**레이아웃**: `grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-3`

##### 3개 이점 카드
1. **검증된 전문가 이용**
   - 아이콘: verified_user

2. **유연한 인력 솔루션**
   - 아이콘: switch_account

3. **협력적 프로그램 강화**
   - 아이콘: auto_awesome

#### Partner Testimonials
**제목**: "파트너들의 이야기"

**레이아웃**: `grid-cols-1 md:grid-cols-2 gap-8`

##### 후기 카드 구성
- **후기 내용**: italic 스타일
- **프로필**:
  - 원형 이미지 (`h-12 w-12 rounded-full`)
  - 이름 (bold)
  - 직책/기관 (작은 글씨)

**예시 후기**:
1. 김민준 - 밝은미래학교 교장
2. 박서연 - 커뮤니티 케어 센터 관리자

#### Partnership Inquiry Form
**배경**: `bg-gray-100 dark:bg-background-dark rounded-lg`

**레이아웃**: `grid-cols-1 md:grid-cols-2`

- **좌측**: 안내 텍스트
  - 제목: "협력 문의"
  - 설명: 양식 작성 안내

- **우측**: 문의 폼
  - 이름
  - 기관명
  - 이메일
  - 메시지 (textarea)
  - 제출 버튼

---

## 6. 후원 및 임팩트 (Support & Impact for Sponsors)

**파일 경로**: `stitch_/support_&_impact_for_sponsors/code.html`

### 페이지 구조

#### Header
- **네비게이션**: 우리의 미션, 사회적 영향, 기여 방법, 파트너
- **CTA**: "후원 파트너 되기"

#### Hero Banner
**배경**: 행복한 가족 이미지 + 다크 그라데이션
```css
background-image: linear-gradient(rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.6) 100%)
min-h-[480px]
```

- **제목**: "가족에게 힘을, 함께 만드는 미래"
- **부제**: "장애인 가족을 위한 따뜻한 공동체를 만드는 데 동참해주세요. 당신의 파트너십이 세상을 바꿀 수 있습니다."
- **CTA**: "후원 파트너 되기"

#### Impact Statistics
**레이아웃**: 3개의 통계 카드 (flex-wrap)

**통계 항목**:
1. **지원한 가족 수**: 500+
2. **맺은 파트너십**: 45
3. **모금된 후원금**: 15억 원

**카드 스타일**:
```css
rounded-lg p-6 border bg-white dark:bg-background-dark
```

#### Social Impact Section
**제목**: "우리의 사회적 영향"

**레이아웃**: `grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4`

##### 3개 임팩트 카드
1. **공동체 통합**
   - 아이콘: groups (Secondary 색상 배경)
   - 설명: 포용적인 환경 조성

2. **역량 개발**
   - 아이콘: work
   - 설명: 워크숍과 맞춤형 교육

3. **맞춤 지원 서비스**
   - 아이콘: volunteer_activism
   - 설명: 필수 자원, 상담, 직접 지원

#### Contribution Methods
**제목**: "다양한 기여 방법"

**레이아웃**: `grid-cols-1 md:grid-cols-2 gap-6`

##### 4가지 기여 방법
1. **기업 파트너십**
   - 설명: CSR 목표에 맞는 맞춤형 패키지
   - CTA: "파트너십 문의"

2. **행사 후원**
   - 설명: 커뮤니티 행사, 워크숍, 연례 모금 행사
   - CTA: "행사 후원하기"

3. **일시 후원**
   - 설명: 크고 작은 모든 기여
   - CTA: "지금 기부하기" (Secondary 버튼)

4. **물품 및 재능 기부**
   - 설명: 사무용품부터 전문 지식까지
   - CTA: "지원 제안하기"

#### Trusted Partners Section
**제목**: "신뢰할 수 있는 파트너"

**레이아웃**: `grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8`

**파트너 로고**:
- Naver
- Kakao
- Samsung
- LG
- SK

**로고 스타일**: `h-8 w-auto opacity-60 dark:invert`

#### Contact & Inquiry Section
**배경**: `bg-white dark:bg-background-dark rounded-xl border`

**레이아웃**: `grid-cols-1 md:grid-cols-2`

- **좌측**: 연락처 정보
  - 제목: "변화를 만들 준비가 되셨나요?"
  - 이메일: partnerships@socialcoop.kr
  - 전화: 02-123-4567

- **우측**: 문의 폼
  - 성함
  - 이메일 주소
  - 회사명 (선택)
  - 메시지
  - 제출 버튼

#### Footer
**구성**:
- 저작권 정보 (등록번호 포함)
- 개인정보 처리방침, 서비스 이용약관, 연간 보고서

---

## 공통 UI 패턴

### 1. Hero Banner Pattern
모든 주요 페이지에서 사용하는 히어로 섹션

```css
/* 배경 이미지 + 그라데이션 */
background-image: linear-gradient(rgba(0, 0, 0, 0.2-0.6) 0%, rgba(0, 0, 0, 0.5-0.6) 100%), url(...)
min-h-[400px-520px]
bg-cover bg-center bg-no-repeat

/* 텍스트 */
text-white text-4xl md:text-5xl font-black
```

### 2. Card Grid Pattern
서비스, 스토리, 파트너 등 다양한 콘텐츠 표시

```css
/* 그리드 레이아웃 */
grid-cols-[repeat(auto-fit,minmax(200px-280px,1fr))]
gap-3 to gap-8

/* 카드 스타일 */
rounded-xl border bg-white dark:bg-slate-900
p-4 to p-6
shadow-sm hover:shadow-lg transition-shadow
```

### 3. Icon + Content Card
아이콘과 텍스트를 결합한 정보 카드

```html
<div class="flex flex-col gap-3">
  <div class="icon-container">
    <span class="material-symbols-outlined">icon_name</span>
  </div>
  <div class="content">
    <h3 class="title">제목</h3>
    <p class="description">설명</p>
  </div>
</div>
```

### 4. Form Pattern
문의, 신청 등 다양한 폼에서 사용

```css
/* 입력 필드 */
block w-full rounded-md
border-slate-300 dark:border-slate-600
bg-white dark:bg-slate-800
py-3 px-4
focus:border-primary focus:ring-primary

/* 레이블 */
block text-sm font-medium text-slate-700 dark:text-slate-300

/* 제출 버튼 */
w-full rounded-lg px-5 py-3
bg-primary text-white font-medium
hover:bg-opacity-90
```

### 5. Testimonial/Review Pattern
후기 카드 패턴

```html
<div class="testimonial-card">
  <p class="italic">후기 내용...</p>
  <div class="author">
    <img class="rounded-full h-12 w-12" />
    <div>
      <p class="font-bold">이름</p>
      <p class="text-sm text-gray-500">직책/기관</p>
    </div>
  </div>
</div>
```

---

## 반응형 디자인 전략

### Mobile First Approach
기본적으로 모바일 스타일을 먼저 정의하고, 큰 화면에 대한 조정 추가

### 주요 반응형 패턴

#### 1. 그리드 레이아웃
```css
/* Mobile: 1 column */
grid-cols-1

/* Tablet: 2 columns */
md:grid-cols-2

/* Desktop: 3-4 columns */
lg:grid-cols-3 xl:grid-cols-4
```

#### 2. 텍스트 크기
```css
/* Mobile */
text-4xl

/* Desktop */
md:text-5xl lg:text-6xl
```

#### 3. 여백
```css
/* Mobile */
px-4 py-8

/* Tablet */
sm:px-6 sm:py-10

/* Desktop */
lg:px-8 lg:py-16
```

#### 4. 네비게이션
- **Mobile**: 햄버거 메뉴
- **Tablet/Desktop**: 전체 메뉴 표시

```css
/* 모바일에서 숨김 */
hidden md:flex

/* 모바일에서만 표시 */
md:hidden
```

---

## 접근성 가이드라인

### 색상 대비
- 텍스트와 배경 간 최소 4.5:1 대비율 유지
- Primary 색상(`#2b8cee`)은 흰색 텍스트와 충분한 대비 제공

### 키보드 내비게이션
- 모든 인터랙티브 요소는 키보드로 접근 가능
- Focus 상태 명확하게 표시:
  ```css
  focus:outline-0 focus:ring-2 focus:ring-primary
  ```

### 대체 텍스트
- 모든 이미지에 `alt` 또는 `data-alt` 속성 제공
- 아이콘에는 `aria-label` 제공

### 시맨틱 HTML
- 적절한 헤딩 계층 구조 (`h1` > `h2` > `h3`)
- 랜드마크 요소 사용 (`header`, `main`, `footer`, `nav`)

---

## 다크 모드 구현

### 클래스 기반 다크 모드
Tailwind의 `dark:` 접두사 사용

### 주요 다크 모드 스타일

#### 배경
```css
bg-background-light dark:bg-background-dark
bg-white dark:bg-slate-900
```

#### 텍스트
```css
text-slate-900 dark:text-white
text-slate-600 dark:text-slate-400
```

#### 경계선
```css
border-slate-200 dark:border-slate-800
```

#### 버튼
다크 모드에서도 Primary 색상은 유지하되, 호버 효과 조정

---

## 애니메이션 및 트랜지션

### 호버 효과
```css
/* 버튼 */
transition-colors hover:bg-primary/90

/* 카드 */
transition-shadow hover:shadow-lg

/* 링크 */
transition-colors hover:text-primary
```

### CTA 버튼 강조
```css
transition-transform hover:scale-105
```

---

## 이미지 가이드라인

### 이미지 비율
- **Hero Banner**: 와이드 (16:9 ~ 21:9)
- **카드 이미지**: `aspect-video` (16:9)
- **프로필 사진**: `aspect-square` (1:1) + `rounded-full`
- **로고**: 자동 높이 (`h-8 w-auto`)

### 이미지 최적화
- WebP 포맷 사용 권장
- 반응형 이미지 (`srcset`) 활용
- Lazy loading 적용

### 배경 이미지
```css
bg-cover bg-center bg-no-repeat
```

---

## 개발 시 고려사항

### 1. 컴포넌트화
반복되는 UI 패턴을 재사용 가능한 컴포넌트로 분리:
- Button
- Card
- Hero Banner
- Form Input
- Icon Card
- Testimonial Card

### 2. 유틸리티 클래스 활용
Tailwind CSS의 유틸리티 우선 접근 방식 활용

### 3. 성능 최적화
- 이미지 최적화
- CSS 번들 최소화
- 불필요한 JavaScript 제거
- Container Query 적극 활용

### 4. 브라우저 호환성
- 주요 모던 브라우저 지원 (Chrome, Firefox, Safari, Edge)
- CSS Grid 및 Flexbox 사용
- Autoprefixer 활용

---

## 참고 자료

### 디자인 파일 위치
- `stitch_/main_landing_page/` - 메인 랜딩 페이지
- `stitch_/about_us_&_vision/` - 소개 및 비전
- `stitch_/family_services_overview/` - 가족 서비스
- `stitch_/family_stories_&_community/` - 가족 이야기
- `stitch_/b2b_solutions_for_partners/` - B2B 솔루션
- `stitch_/support_&_impact_for_sponsors/` - 후원 및 임팩트

각 폴더에는 다음이 포함됩니다:
- `code.html` - HTML 구현
- `screen.png` - 디자인 스크린샷

---

## 업데이트 이력

- **2024-11-18**: 초기 화면 디자인 명세서 작성
  - 6개 주요 페이지 분석 및 문서화
  - 디자인 시스템 정의
  - 공통 UI 패턴 정리
  - 반응형 및 접근성 가이드라인 추가
