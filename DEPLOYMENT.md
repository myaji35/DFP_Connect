# DFP Connect - 배포 가이드

## 프로젝트 정보

- **GitHub Repository**: https://github.com/myaji35/DFP_Connect.git
- **Owner**: myaji35
- **GCP Project ID**: `marketsphere-476701`
- **Project Name**: DFP Connect
- **Region**: `asia-northeast3` (서울)

---

## 배포 방법

### 1. Cloud Run 배포 (추천)

#### 사전 준비
```bash
# GCP CLI 설치 및 인증
gcloud auth login
gcloud config set project marketsphere-476701

# Cloud Run API 활성화
gcloud services enable run.googleapis.com
gcloud services enable cloudbuild.googleapis.com
```

#### 배포 명령어
```bash
# Docker 이미지 빌드 및 배포
gcloud builds submit --config cloudbuild.yaml

# 또는 직접 배포
gcloud run deploy dfp-connect \
  --source . \
  --region asia-northeast3 \
  --platform managed \
  --allow-unauthenticated \
  --memory 512Mi \
  --cpu 1 \
  --min-instances 0 \
  --max-instances 10
```

#### 환경변수 설정
```bash
gcloud run services update dfp-connect \
  --region asia-northeast3 \
  --set-env-vars="NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key" \
  --set-env-vars="CLERK_SECRET_KEY=your_secret"
```

---

### 2. App Engine 배포

```bash
# App Engine 배포
gcloud app deploy app.yaml

# 환경변수 설정 (app.yaml에서 관리)
```

---

### 3. Firebase Hosting 배포

```bash
# Firebase CLI 설치
npm install -g firebase-tools

# Firebase 초기화
firebase init hosting

# Next.js export
npm run build
npx next export

# 배포
firebase deploy --only hosting
```

---

## 배포 후 확인사항

### Cloud Run
```bash
# 서비스 URL 확인
gcloud run services describe dfp-connect --region asia-northeast3 --format="value(status.url)"

# 로그 확인
gcloud run services logs read dfp-connect --region asia-northeast3
```

### 상태 모니터링
```bash
# 서비스 상태 확인
gcloud run services list --region asia-northeast3

# 트래픽 확인
gcloud run services describe dfp-connect --region asia-northeast3
```

---

## 커스텀 도메인 설정

### Cloud Run
```bash
# 도메인 매핑
gcloud run domain-mappings create \
  --service dfp-connect \
  --domain dfp.or.kr \
  --region asia-northeast3
```

---

## CI/CD 설정

### GitHub Actions 자동 배포

이 프로젝트는 GitHub Actions를 통한 자동 배포가 설정되어 있습니다.

#### GitHub Secrets 설정

GitHub 저장소 설정에서 다음 Secrets를 추가하세요:

1. **GCP_SA_KEY**: GCP Service Account JSON 키
2. **CLERK_PUBLISHABLE_KEY**: Clerk Publishable Key
3. **CLERK_SECRET_KEY**: Clerk Secret Key

#### Service Account 생성

```bash
# Service Account 생성
gcloud iam service-accounts create github-actions \
  --display-name="GitHub Actions"

# 권한 부여
gcloud projects add-iam-policy-binding marketsphere-476701 \
  --member="serviceAccount:github-actions@marketsphere-476701.iam.gserviceaccount.com" \
  --role="roles/run.admin"

gcloud projects add-iam-policy-binding marketsphere-476701 \
  --member="serviceAccount:github-actions@marketsphere-476701.iam.gserviceaccount.com" \
  --role="roles/storage.admin"

gcloud projects add-iam-policy-binding marketsphere-476701 \
  --member="serviceAccount:github-actions@marketsphere-476701.iam.gserviceaccount.com" \
  --role="roles/iam.serviceAccountUser"

# JSON 키 생성
gcloud iam service-accounts keys create key.json \
  --iam-account=github-actions@marketsphere-476701.iam.gserviceaccount.com
```

#### 자동 배포 프로세스

`main` 브랜치에 push하면 자동으로:
1. 코드 체크아웃
2. 의존성 설치
3. 빌드
4. Docker 이미지 생성
5. GCR에 푸시
6. Cloud Run에 배포

---

## 비용 최적화

- **Cold Start 최소화**: min-instances를 1로 설정 (트래픽이 많을 경우)
- **메모리 조정**: 실제 사용량에 맞게 512Mi ~ 1Gi 조절
- **로그 관리**: 불필요한 로그 레벨 조정

---

## 트러블슈팅

### 빌드 실패 시
```bash
# 로컬에서 Docker 빌드 테스트
docker build -t dfp-connect .
docker run -p 3000:3000 dfp-connect
```

### 환경변수 누락 시
```bash
# 환경변수 확인
gcloud run services describe dfp-connect --region asia-northeast3 --format="value(spec.template.spec.containers[0].env)"
```

### 로그 확인
```bash
# 실시간 로그
gcloud run services logs tail dfp-connect --region asia-northeast3
```

---

## 참고 자료

- [Cloud Run 문서](https://cloud.google.com/run/docs)
- [Next.js 배포 가이드](https://nextjs.org/docs/deployment)
- [GCP 가격 계산기](https://cloud.google.com/products/calculator)

---

**마지막 업데이트**: 2025-10-30
