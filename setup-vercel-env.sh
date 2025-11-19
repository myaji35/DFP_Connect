#!/bin/bash

# Vercel 환경변수 자동 설정 스크립트
# 사용법: ./setup-vercel-env.sh

echo "=================================================="
echo "Vercel 환경변수 자동 설정"
echo "=================================================="
echo ""

# 환경변수 값
DATABASE_URL="postgresql://postgres:DFPConnect2025!@34.158.210.184:5432/dfpconnect?schema=public"
CLERK_PUBLISHABLE_KEY="pk_test_b3JnYW5pYy10cm9sbC03NS5jbGVyay5hY2NvdW50cy5kZXYk"
CLERK_SECRET_KEY="sk_test_aBbPiRAv6pYi78WoQ5cxSSzrvGwmyvAvfKrfaXwvyT"
ENCRYPTION_KEY="a78ca3b310c9e9438764c51549e175663eb5f80587c697d505518d2b4ecc6a8e"

# 환경변수 추가 함수
add_env() {
    local name=$1
    local value=$2
    local env_type=$3

    echo "설정 중: $name ($env_type)"
    echo "$value" | vercel env add "$name" "$env_type" 2>&1 | grep -v "What's the value"
}

echo "1. DATABASE_URL 설정..."
add_env "DATABASE_URL" "$DATABASE_URL" "production"
add_env "DATABASE_URL" "$DATABASE_URL" "preview"
add_env "DATABASE_URL" "$DATABASE_URL" "development"

echo ""
echo "2. NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY 설정..."
add_env "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY" "$CLERK_PUBLISHABLE_KEY" "production"
add_env "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY" "$CLERK_PUBLISHABLE_KEY" "preview"
add_env "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY" "$CLERK_PUBLISHABLE_KEY" "development"

echo ""
echo "3. CLERK_SECRET_KEY 설정..."
add_env "CLERK_SECRET_KEY" "$CLERK_SECRET_KEY" "production"
add_env "CLERK_SECRET_KEY" "$CLERK_SECRET_KEY" "preview"
add_env "CLERK_SECRET_KEY" "$CLERK_SECRET_KEY" "development"

echo ""
echo "4. ENCRYPTION_KEY 설정..."
add_env "ENCRYPTION_KEY" "$ENCRYPTION_KEY" "production"
add_env "ENCRYPTION_KEY" "$ENCRYPTION_KEY" "preview"
add_env "ENCRYPTION_KEY" "$ENCRYPTION_KEY" "development"

echo ""
echo "=================================================="
echo "환경변수 설정 완료!"
echo "=================================================="
echo ""
echo "다음 명령어로 프로덕션 배포를 진행하세요:"
echo "  vercel --prod"
echo ""
