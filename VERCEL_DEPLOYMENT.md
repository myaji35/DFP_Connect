# Vercel 배포 가이드

## 1. 사전 준비사항

### 필수 서비스
- **Vercel 계정**: https://vercel.com
- **GitHub 저장소**: 코드가 push된 상태
- **PostgreSQL 데이터베이스**: Vercel Postgres, Supabase, Neon 중 선택
- **Clerk 계정**: https://clerk.com (인증 서비스)

### 선택 서비스
- **Upstash Redis**: https://upstash.com (캐싱 & Rate Limiting)
- **Cloudflare Turnstile**: https://dash.cloudflare.com (봇 방지)

---

## 2. 데이터베이스 설정

### 옵션 A: Vercel Postgres (권장)
```bash
# Vercel Dashboard에서 Postgres 생성
# Storage > Create Database > Postgres
# 자동으로 DATABASE_URL이 환경변수에 추가됩니다
```

### 옵션 B: Supabase
```bash
# 1. Supabase 프로젝트 생성
# 2. Settings > Database > Connection String (URI) 복사
# 3. Vercel 환경변수에 DATABASE_URL로 추가
```

### 옵션 C: Neon
```bash
# 1. Neon 프로젝트 생성
# 2. Connection String 복사
# 3. Vercel 환경변수에 DATABASE_URL로 추가
```

---

## 3. Vercel 프로젝트 생성

### 방법 1: Vercel Dashboard (추천)
1. https://vercel.com 로그인
2. "Add New Project" 클릭
3. GitHub 저장소 선택: `04_DFP_Connect`
4. Framework Preset: **Next.js** (자동 감지됨)
5. Root Directory: `.` (기본값)
6. Build Command: `prisma generate && next build`
7. Output Directory: `.next` (기본값)

### 방법 2: Vercel CLI
```bash
# Vercel CLI 설치
npm i -g vercel

# 프로젝트 디렉토리에서 실행
vercel

# 프로덕션 배포
vercel --prod
```

---

## 4. 환경변수 설정

Vercel Dashboard > Project > Settings > Environment Variables

### 필수 환경변수

#### 1. DATABASE_URL
```
postgresql://user:password@host:5432/database?schema=public
```
- Vercel Postgres 사용 시 자동 추가됨
- 수동 설정 시: Database 연결 문자열 입력

#### 2. NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
```
pk_live_xxxxxxxxxxxxx
```
- Clerk Dashboard > API Keys > Publishable key
- Environment: **Production**
- Visibility: **Public** (NEXT_PUBLIC_)

#### 3. CLERK_SECRET_KEY
```
sk_live_xxxxxxxxxxxxx
```
- Clerk Dashboard > API Keys > Secret key
- Environment: **Production**
- Visibility: **Secret**

#### 4. ENCRYPTION_KEY
```bash
# 터미널에서 생성
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
- 64자 hex string
- 민감 데이터 암호화에 사용
- Visibility: **Secret**

### 선택 환경변수 (성능 향상)

#### 5. UPSTASH_REDIS_REST_URL
```
https://xxxxx.upstash.io
```
- Upstash Dashboard > Database > REST API > URL

#### 6. UPSTASH_REDIS_REST_TOKEN
```
AxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxQ
```
- Upstash Dashboard > Database > REST API > Token

#### 7. TURNSTILE_SECRET_KEY
```
0x4xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```
- Cloudflare Dashboard > Turnstile > Site > Secret Key

#### 8. NEXT_PUBLIC_TURNSTILE_SITE_KEY
```
0x4xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```
- Cloudflare Dashboard > Turnstile > Site > Site Key
- Visibility: **Public**

---

## 5. 데이터베이스 마이그레이션

### 배포 후 실행
```bash
# Vercel에서 자동으로 Prisma를 실행하지만,
# 마이그레이션은 수동으로 실행해야 합니다

# 로컬에서 프로덕션 DB에 마이그레이션
DATABASE_URL="your_production_database_url" npx prisma migrate deploy

# 또는 Vercel CLI로 실행
vercel env pull .env.production.local
npx prisma migrate deploy
```

### Seed 데이터 (선택)
```bash
# 초기 데이터 입력 (개발용)
DATABASE_URL="your_production_database_url" npm run db:seed
```

---

## 6. 배포 확인

### 체크리스트
- [ ] 배포 성공 (Build & Deployment Logs 확인)
- [ ] 메인 페이지 로드 (/)
- [ ] 로그인/로그아웃 작동 (/sign-in)
- [ ] 긴급돌봄 폼 제출 (/services)
- [ ] 스토리 목록 조회 (/stories)
- [ ] 스토리 제출 (/stories/submit)
- [ ] 데이터베이스 연결 확인

### 로그 확인
```bash
# Vercel Dashboard
Project > Deployments > [Latest] > Function Logs

# Vercel CLI
vercel logs
```

---

## 7. 도메인 연결 (선택)

### Custom Domain 설정
1. Vercel Dashboard > Project > Settings > Domains
2. "Add Domain" 클릭
3. 도메인 입력 (예: dfp-connect.org)
4. DNS 레코드 추가:
   - Type: **CNAME**
   - Name: **www** (또는 @)
   - Value: **cname.vercel-dns.com**
5. 자동 SSL 인증서 발급 (무료)

---

## 8. 모니터링 & 디버깅

### Vercel Analytics
```bash
# 자동으로 활성화됨 (무료 플랜: 100k requests/month)
# Dashboard > Analytics에서 확인
```

### Error Tracking
```bash
# Vercel Dashboard > Project > Deployments > Logs
# Runtime Logs에서 에러 확인
```

### Database Monitoring
```bash
# Vercel Postgres: Dashboard > Storage > Database > Insights
# Supabase: Dashboard > Database > Logs
# Neon: Dashboard > Monitoring
```

---

## 9. 환경별 설정

### Development (로컬)
- `.env.local` 사용
- SQLite 또는 로컬 PostgreSQL
- Clerk Test Keys

### Production (Vercel)
- Vercel 환경변수 사용
- 프로덕션 PostgreSQL
- Clerk Production Keys
- Redis & Turnstile 활성화

---

## 10. 트러블슈팅

### 빌드 실패
```bash
# Prisma Generate 오류
# Solution: Build Command에 "prisma generate &&" 추가

# Module not found
# Solution: package.json dependencies 확인 후 재배포
```

### 데이터베이스 연결 실패
```bash
# DATABASE_URL 형식 확인
# Vercel Postgres: 자동 생성된 URL 사용
# SSL 필요 시: ?sslmode=require 추가
```

### Clerk 인증 오류
```bash
# Production Keys 사용 확인
# NEXT_PUBLIC_ prefix 확인
# Clerk Dashboard > Allowed Origins에 Vercel URL 추가
```

---

## 참고 자료

- [Vercel Docs](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Prisma with Vercel](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel)
- [Clerk + Vercel](https://clerk.com/docs/deployments/deploy-to-vercel)
