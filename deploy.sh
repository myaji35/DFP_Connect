#!/bin/bash

# DFP Connect 배포 스크립트

set -e

echo "🚀 DFP Connect 배포 시작..."

# 프로젝트 ID
PROJECT_ID="dfp-connect-476703"
REGION="asia-northeast3"
SERVICE_NAME="dfp-connect"

# 환경 변수 (실제 값으로 변경 필요)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_b3JnYW5pYy10cm9sbC03NS5jbGVyay5hY2NvdW50cy5kZXYk"
CLERK_SECRET_KEY="sk_test_aBbPiRAv6pYi78WoQ5cxSSzrvGwmyvAvfKrfaXwvyT"
DATABASE_URL="postgresql://postgres:DFPConnect2025!@localhost/dfp_connect?host=/cloudsql/${PROJECT_ID}:${REGION}:dfp-postgres"

# GCP 프로젝트 설정
echo "📝 GCP 프로젝트 설정: $PROJECT_ID"
gcloud config set project $PROJECT_ID

# 필요한 API 활성화
echo "🔧 필요한 GCP API 활성화..."
gcloud services enable \
  cloudbuild.googleapis.com \
  run.googleapis.com \
  sql-component.googleapis.com \
  sqladmin.googleapis.com \
  artifactregistry.googleapis.com

# Docker 이미지 빌드
echo "🐳 Docker 이미지 빌드 중..."
docker build \
  --build-arg NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="$NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY" \
  --build-arg CLERK_SECRET_KEY="$CLERK_SECRET_KEY" \
  --build-arg DATABASE_URL="$DATABASE_URL" \
  -t gcr.io/$PROJECT_ID/$SERVICE_NAME:latest .

# Container Registry에 푸시
echo "📦 Container Registry에 이미지 푸시..."
docker push gcr.io/$PROJECT_ID/$SERVICE_NAME:latest

# Cloud Run에 배포
echo "☁️  Cloud Run에 배포 중..."
gcloud run deploy $SERVICE_NAME \
  --image gcr.io/$PROJECT_ID/$SERVICE_NAME:latest \
  --region $REGION \
  --platform managed \
  --allow-unauthenticated \
  --add-cloudsql-instances $PROJECT_ID:$REGION:dfp-postgres \
  --set-env-vars "DATABASE_URL=$DATABASE_URL,NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=$NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,CLERK_SECRET_KEY=$CLERK_SECRET_KEY,NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in,NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up,NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard,NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard" \
  --memory 512Mi \
  --cpu 1 \
  --min-instances 0 \
  --max-instances 10

echo "✅ 배포 완료!"
echo "🌐 서비스 URL:"
gcloud run services describe $SERVICE_NAME --region $REGION --format='value(status.url)'
