# SpecKit Constitution (기본원칙)

## 📜 프로젝트 선언문

**SpecKit**은 다양한 검증 도구들을 ShellSpec으로 통합하여 일관성 있는 테스트 환경을 제공하는 도구입니다.

---

## 🎯 핵심 원칙

### 1. 통합성 (Integration)
- 여러 검증 도구를 하나의 통일된 인터페이스로 제공
- ShellSpec 기반의 일관된 테스트 프레임워크 사용
- 도구별 차이를 추상화하여 학습 곡선 최소화

### 2. 자동화 (Automation)
- 코드 품질 검증을 자동화하여 수동 검사 부담 감소
- CI/CD 파이프라인에 쉽게 통합 가능
- 프로젝트 전체를 일괄 검증할 수 있는 기능 제공

### 3. 포괄성 (Comprehensiveness)
- 다양한 언어와 도구 지원:
  - Shell 스크립트 (Bash, Dash, ShellCheck)
  - JavaScript/TypeScript (ESLint)
  - CSS (Stylelint)
  - Markdown (Markdownlint)
  - HTML (Markuplint, Tidy)
  - Git 저장소 무결성
  - 기타 (GNU Make, jq, Desktop files)

### 4. 신뢰성 (Reliability)
- 엄격한 검증 기준 적용
- 잠재적 오류를 사전에 발견
- 코드 품질과 보안성 향상

### 5. 확장성 (Extensibility)
- 새로운 검증 도구를 쉽게 추가 가능
- 모듈화된 구조로 유지보수 용이
- 커스터마이징 가능한 검증 규칙

---

## 🏗️ 아키텍처 원칙

### 모듈 구조
```
speckit/
├── spec/
│   ├── lib/speckit.sh          # 공통 헬퍼 함수 라이브러리
│   ├── spec_helper.sh          # ShellSpec 설정
│   └── *_spec.sh               # 개별 검증 도구 spec 파일들
```

### 설계 철학
1. **DRY (Don't Repeat Yourself)**
   - 공통 로직은 `speckit.sh` 라이브러리로 추출
   - 재사용 가능한 헬퍼 함수 제공

2. **단일 책임 원칙**
   - 각 spec 파일은 하나의 도구만 담당
   - 명확한 책임 분리로 유지보수성 향상

3. **의존성 관리**
   - 각 spec 파일은 필요한 명령어가 없으면 Skip
   - 환경에 따라 유연하게 동작

---

## 📋 사용 규칙

### 1. 검증 범위
- **프로젝트 루트**부터 재귀적으로 검색
- `.git`, `node_modules` 등 제외 디렉토리 자동 처리
- 파일 타입별 적절한 도구 자동 선택

### 2. 실행 방법
```bash
# 개별 도구 실행
shellspec node_modules/speckit/spec/git_spec.sh
shellspec node_modules/speckit/spec/eslint_spec.sh

# npm 스크립트로 실행
npm run git:speckit

# 통합 스크립트로 실행 (권장)
./speckit.specify git
./speckit.specify eslint
./speckit.specify --all
```

### 3. 환경 변수 커스터마이징
```bash
# Git 명령어 경로 지정
SPECKIT_GIT_CMD=/usr/local/bin/git shellspec spec/git_spec.sh

# 추가 인자 전달
SPECKIT_GIT_ARGS="--no-pager" shellspec spec/git_spec.sh

# Find 명령어 커스터마이징
SPECKIT_FIND_CMD=gfind shellspec spec/*_spec.sh
```

---

## ✅ 품질 기준

### Git 저장소 검증
1. **Staging 영역 검사**
   - `git diff --cached --check`: 공백 오류, 충돌 마커 검출

2. **커밋 그래프 무결성**
   - `git commit-graph verify`: 커밋 그래프 검증

3. **저장소 전체 검사**
   - `git fsck --full --strict`: 모든 객체 무결성 확인

### 코드 품질 검증
- **ESLint**: JavaScript/TypeScript 코드 스타일, 잠재적 버그 검출
- **ShellCheck**: Shell 스크립트 정적 분석, 안티패턴 검출
- **Stylelint**: CSS 스타일 가이드 준수 확인
- **Markdownlint**: Markdown 문서 형식 일관성 유지

---

## 🔧 확장 가이드

### 새로운 검증 도구 추가하기

1. **Spec 파일 생성**
   ```bash
   spec/mytool_spec.sh
   ```

2. **기본 구조 작성**
   ```bash
   #!/usr/bin/env sh

   eval "$(shellspec -) exit 1"

   # 헬퍼 라이브러리 Include
   Include "${SHELLSPEC_HELPERDIR}/lib/speckit.sh"

   Describe 'mytool'
     Skip if 'not exists mytool' speckit_not_exists_all mytool

     Example 'basic validation'
       When call mytool --check .
       The status should eq 0
     End
   End
   ```

3. **npm 스크립트 등록**
   ```json
   {
     "scripts": {
       "mytool:speckit": "shellspec node_modules/speckit/spec/mytool_spec.sh"
     }
   }
   ```

4. **통합 스크립트에 추가**
   `speckit.specify` 파일의 `SPECS` 배열에 추가

---

## 📊 보고 및 모니터링

### 테스트 결과 해석
- ✅ **성공**: 모든 검증 통과
- ❌ **실패**: 하나 이상의 검증 실패 (수정 필요)
- ⏭️  **Skip**: 필요한 도구가 설치되지 않음

### CI/CD 통합
```yaml
# GitHub Actions 예제
- name: Run SpecKit Tests
  run: |
    npm install
    ./speckit.specify --all
```

---

## 🤝 기여 원칙

### 1. 코드 품질
- 모든 spec 파일은 ShellCheck 통과 필수
- 일관된 코딩 스타일 유지
- 명확한 주석 및 문서화

### 2. 테스트 작성
- 새로운 기능은 반드시 테스트 포함
- Edge case 고려
- Skip 조건 명확히 정의

### 3. 문서화
- README 업데이트
- 사용 예제 제공
- 변경 사항 CHANGELOG 기록

---

## 📄 라이선스 및 저작권

- **라이선스**: GPL-3.0-only
- **저작권**: Copyright (C) 2025 qq542vev
- **프로젝트 홈페이지**: https://github.com/qq542vev/speckit
- **버그 리포트**: https://github.com/qq542vev/speckit/issues

---

## 🎓 철학

> "측정할 수 없으면 개선할 수 없다"

SpecKit은 코드 품질을 객관적으로 측정하고, 지속적으로 개선할 수 있는 기반을 제공합니다.

---

**마지막 업데이트**: 2025-11-18
**문서 버전**: 1.0.0
**프로젝트**: DFP Connect
