import { Redis } from '@upstash/redis'
import type { NextRequest } from 'next/server'

// Redis 클라이언트
let redis: Redis | null = null

if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  })
}

export interface RateLimitConfig {
  /**
   * 시간 창 (초 단위)
   * 예: 60 = 1분, 3600 = 1시간
   */
  window: number

  /**
   * 시간 창 내 최대 요청 수
   */
  limit: number

  /**
   * Rate limit 키 접두사
   */
  prefix?: string
}

export interface RateLimitResult {
  /**
   * 요청 허용 여부
   */
  allowed: boolean

  /**
   * 시간 창 내 최대 요청 수
   */
  limit: number

  /**
   * 남은 요청 수
   */
  remaining: number

  /**
   * Rate limit 리셋 시각 (Unix timestamp)
   */
  reset: number
}

/**
 * IP 주소 가져오기
 */
export function getIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')

  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }

  if (realIP) {
    return realIP
  }

  return 'unknown'
}

/**
 * Rate Limiting 체크
 * @param identifier 식별자 (IP, 이메일 등)
 * @param config Rate limit 설정
 */
export async function rateLimit(
  identifier: string,
  config: RateLimitConfig
): Promise<RateLimitResult> {
  // Redis가 없으면 모든 요청 허용
  if (!redis) {
    return {
      allowed: true,
      limit: config.limit,
      remaining: config.limit,
      reset: Date.now() + config.window * 1000,
    }
  }

  const prefix = config.prefix || 'ratelimit'
  const key = `${prefix}:${identifier}`
  const now = Date.now()
  const windowStart = now - config.window * 1000

  try {
    // Redis에서 현재 카운트 가져오기
    const current = await redis.get<number>(key)

    if (current === null || current === undefined) {
      // 첫 요청
      await redis.setex(key, config.window, 1)
      return {
        allowed: true,
        limit: config.limit,
        remaining: config.limit - 1,
        reset: now + config.window * 1000,
      }
    }

    if (current >= config.limit) {
      // 제한 초과
      const ttl = await redis.ttl(key)
      return {
        allowed: false,
        limit: config.limit,
        remaining: 0,
        reset: now + (ttl || config.window) * 1000,
      }
    }

    // 카운트 증가
    await redis.incr(key)

    return {
      allowed: true,
      limit: config.limit,
      remaining: config.limit - current - 1,
      reset: now + config.window * 1000,
    }
  } catch (error) {
    console.error('Rate limit error:', error)
    // 에러 시 요청 허용 (fail-open)
    return {
      allowed: true,
      limit: config.limit,
      remaining: config.limit,
      reset: now + config.window * 1000,
    }
  }
}

/**
 * IP 기반 Rate Limiting
 */
export async function rateLimitByIP(
  request: NextRequest,
  config: RateLimitConfig
): Promise<RateLimitResult> {
  const ip = getIP(request)
  return rateLimit(ip, config)
}

/**
 * 이메일 기반 Rate Limiting
 */
export async function rateLimitByEmail(
  email: string,
  config: RateLimitConfig
): Promise<RateLimitResult> {
  return rateLimit(email.toLowerCase(), config)
}

// 기본 Rate Limit 설정
export const rateLimitConfigs = {
  // 폼 제출: IP당 시간당 10회
  formSubmission: {
    window: 3600, // 1시간
    limit: 10,
    prefix: 'form',
  } as RateLimitConfig,

  // 스토리 제출: IP당 하루 3회
  storySubmission: {
    window: 86400, // 24시간
    limit: 3,
    prefix: 'story',
  } as RateLimitConfig,

  // API 일반: IP당 분당 60회
  apiGeneral: {
    window: 60, // 1분
    limit: 60,
    prefix: 'api',
  } as RateLimitConfig,
}
