# DFP Connect

장애와가족플랫폼 사회적협동조합의 디지털 허브 웹사이트

![DFP Connect](https://img.shields.io/badge/Next.js-16.0-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38bdf8)
![Clerk](https://img.shields.io/badge/Clerk-Auth-6c47ff)

---

## 🌟 프로젝트 소개

**DFP Connect**는 장애인 가족과 함께하는 사회적 돌봄체계를 구축하기 위한 디지털 플랫폼입니다.

### 핵심 가치
- ❤️ **함께하는 돌봄**: 가족과 지역사회가 함께하는 상호돌봄 문화 조성
- 🤝 **전문성**: 검증된 전문가를 통한 최상의 서비스 제공
- ✨ **혁신**: 디지털 기술을 활용한 새로운 돌봄 솔루션

---

## 🎯 주요 서비스

1. **긴급돌봄** - 24시간 긴급 상황 대응
2. **방과후 홈티** - 1:1 맞춤형 교육 서비스
3. **개별/가족 상담** - 전문 상담사 지원
4. **맞춤형 여행** - 장애인 가족을 위한 특별한 여행
5. **전문인력 파견** - B2B 협력 서비스

---

## 🛠 기술 스택

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5.9
- **Styling**: Tailwind CSS 3.0
- **UI Components**: shadcn/ui
- **Icons**: Lucide React

### Authentication
- **Clerk**: 사용자 인증 및 관리
- **Features**: 소셜 로그인, 세션 관리, 한국어 지원

### Deployment
- **Platform**: Google Cloud Platform (GCP)
- **Project ID**: marketsphere-476701
- **Service**: Cloud Run (서울 리전)

---

## 📂 프로젝트 구조

```
DFP_Connect/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # 메인 레이아웃
│   ├── page.tsx                 # 홈페이지
│   ├── sign-in/                 # 로그인 페이지
│   ├── sign-up/                 # 회원가입 페이지
│   └── dashboard/               # 사용자 대시보드
├── components/                   # React 컴포넌트
│   ├── header.tsx               # 헤더
│   ├── persona-selector.tsx     # 페르소나 선택
│   └── emergency-care-button.tsx # 긴급돌봄 버튼
├── lib/                         # 유틸리티 함수
├── stitch_/                     # 화면 디자인 레퍼런스
│   ├── main_landing_page/       # 메인 랜딩 페이지
│   ├── about_us_&_vision/       # 소개 및 비전
│   ├── family_services_overview/# 가족 서비스
│   ├── family_stories_&_community/ # 가족 이야기
│   ├── b2b_solutions_for_partners/ # B2B 솔루션
│   └── support_&_impact_for_sponsors/ # 후원 및 임팩트
├── docs/                        # 문서
│   ├── brainstorming-session-results.md
│   ├── SCREEN_DESIGN.md         # 화면 디자인 명세서
│   ├── prd.md                   # 제품 요구사항 문서
│   └── DEPLOYMENT.md            # 배포 가이드
├── .env.local                   # 환경변수 (Git 제외)
├── Dockerfile                   # Docker 설정
└── cloudbuild.yaml             # Cloud Build 설정
```

## 📖 프로젝트 문서

### 핵심 문서
- **[PRD (Product Requirements Document)](./prd.md)** - 제품 요구사항 정의
- **[화면 디자인 명세서](./SCREEN_DESIGN.md)** - UI/UX 디자인 가이드 및 Tailwind CSS 기술 명세
- **[배포 가이드](./DEPLOYMENT.md)** - GCP Cloud Run 배포 절차
- **[Claude 가이드](./CLAUDE.md)** - AI 개발 어시스턴트를 위한 프로젝트 지침

---

## 🚀 시작하기

### 사전 요구사항
- Node.js 20+
- npm or yarn

### 설치

```bash
# 저장소 클론
git clone https://github.com/myaji35/DFP_Connect.git
cd DFP_Connect

# 의존성 설치
npm install
```

### 환경변수 설정

`.env.local` 파일을 생성하고 다음 값들을 설정하세요:

```env
# Clerk API Keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key

# Clerk URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 http://localhost:3000 을 열어 확인하세요.

---

## 📦 빌드

```bash
# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start
```

---

## 🌐 배포

### GCP Cloud Run 배포

```bash
# GCP 프로젝트 설정
gcloud config set project marketsphere-476701

# Cloud Run 배포
gcloud run deploy dfp-connect \
  --source . \
  --region asia-northeast3 \
  --platform managed \
  --allow-unauthenticated
```

상세한 배포 가이드는 [DEPLOYMENT.md](./DEPLOYMENT.md)를 참고하세요.

---

## 🎨 주요 기능

### 🏠 홈페이지
- 3개 핵심 페르소나별 맞춤 경험
- 긴급돌봄 바로가기 (고정 버튼)
- 서비스 안내 및 조직 소개
- 반응형 디자인

### 🔐 인증 시스템
- Clerk 기반 사용자 인증
- 소셜 로그인 지원
- 한국어 UI
- 보안 미들웨어

### 📊 사용자 대시보드
- 개인화된 서비스 관리
- 최근 활동 타임라인
- 빠른 실행 버튼
- 프로필 관리

---

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 라이선스

이 프로젝트는 장애와가족플랫폼 사회적협동조합의 소유입니다.

---

## 📞 연락처

- **웹사이트**: https://dfp.or.kr
- **이메일**: contact@dfp.or.kr
- **긴급돌봄**: 1234-5678 (24시간)

---

## 🙏 감사의 말

이 프로젝트는 장애인 가족과 함께 더 나은 세상을 만들어가고자 하는
모든 분들의 노력으로 만들어졌습니다.

---

**© 2025 장애와가족플랫폼 사회적협동조합. All rights reserved.**
