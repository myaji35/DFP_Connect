/**
 * Cloudflare Turnstile 검증 유틸리티
 *
 * 폼 제출 시 봇 방지를 위한 Turnstile 토큰 검증
 */

export interface TurnstileResponse {
  success: boolean
  'error-codes'?: string[]
  challenge_ts?: string
  hostname?: string
}

/**
 * Turnstile 토큰 검증
 * @param token Turnstile 클라이언트 토큰
 * @param remoteip 사용자 IP 주소 (선택)
 * @returns 검증 성공 여부
 */
export async function verifyTurnstile(
  token: string,
  remoteip?: string
): Promise<{ success: boolean; error?: string }> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY

  // Turnstile이 설정되지 않은 경우 (개발 환경)
  if (!secretKey) {
    console.warn('⚠️ Turnstile not configured - verification skipped')
    return { success: true }
  }

  // 토큰이 없는 경우
  if (!token) {
    return {
      success: false,
      error: 'Turnstile 토큰이 필요합니다',
    }
  }

  try {
    const formData = new FormData()
    formData.append('secret', secretKey)
    formData.append('response', token)
    if (remoteip) {
      formData.append('remoteip', remoteip)
    }

    const response = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        body: formData,
      }
    )

    const data: TurnstileResponse = await response.json()

    if (!data.success) {
      console.error('Turnstile verification failed:', data['error-codes'])
      return {
        success: false,
        error: '봇 검증에 실패했습니다. 다시 시도해주세요.',
      }
    }

    return { success: true }
  } catch (error) {
    console.error('Turnstile verification error:', error)
    // 에러 시 fail-open (요청 허용) - 서비스 중단 방지
    return { success: true }
  }
}

/**
 * Next.js API Route에서 Turnstile 검증
 * 사용 예시:
 *
 * ```typescript
 * const { success, error } = await verifyTurnstileFromRequest(request)
 * if (!success) {
 *   return NextResponse.json({ error }, { status: 400 })
 * }
 * ```
 */
export async function verifyTurnstileFromRequest(
  request: Request
): Promise<{ success: boolean; error?: string }> {
  try {
    const body = await request.json()
    const token = body.turnstileToken || body['cf-turnstile-response']

    // IP 주소 가져오기
    const forwarded = request.headers.get('x-forwarded-for')
    const realIP = request.headers.get('x-real-ip')
    const remoteip = forwarded?.split(',')[0].trim() || realIP || undefined

    return verifyTurnstile(token, remoteip)
  } catch (error) {
    console.error('Turnstile request verification error:', error)
    return {
      success: false,
      error: '요청 처리 중 오류가 발생했습니다',
    }
  }
}
