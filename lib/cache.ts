import { Redis } from '@upstash/redis'

// Redis 클라이언트 초기화 (환경변수가 없으면 null)
let redis: Redis | null = null

if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  })
} else {
  console.warn('⚠️ Redis not configured - caching disabled')
}

/**
 * 캐시에서 데이터 가져오기
 * @param key 캐시 키
 * @returns 캐시된 데이터 또는 null
 */
export async function getCache<T>(key: string): Promise<T | null> {
  if (!redis) return null

  try {
    const data = await redis.get<T>(key)
    return data
  } catch (error) {
    console.error('Cache get error:', error)
    return null
  }
}

/**
 * 캐시에 데이터 저장
 * @param key 캐시 키
 * @param value 저장할 데이터
 * @param ttlSeconds TTL (초 단위, 기본 300초 = 5분)
 */
export async function setCache<T>(
  key: string,
  value: T,
  ttlSeconds: number = 300
): Promise<void> {
  if (!redis) return

  try {
    await redis.setex(key, ttlSeconds, JSON.stringify(value))
  } catch (error) {
    console.error('Cache set error:', error)
  }
}

/**
 * 캐시 삭제
 * @param key 캐시 키
 */
export async function deleteCache(key: string): Promise<void> {
  if (!redis) return

  try {
    await redis.del(key)
  } catch (error) {
    console.error('Cache delete error:', error)
  }
}

/**
 * 패턴으로 캐시 삭제 (예: "stories:*")
 * @param pattern 패턴
 */
export async function deleteCacheByPattern(pattern: string): Promise<void> {
  if (!redis) return

  try {
    // Upstash Redis는 scan을 지원하지 않으므로 개별 키를 삭제해야 함
    // 대신 명시적인 키 목록을 관리하거나 namespace를 사용
    console.warn('Pattern deletion not fully supported with Upstash Redis')
  } catch (error) {
    console.error('Cache pattern delete error:', error)
  }
}

// 캐시 키 생성 헬퍼
export const cacheKeys = {
  stories: {
    list: (category?: string, page: number = 1) =>
      `stories:list:${category || 'all'}:${page}`,
    detail: (id: string) => `stories:detail:${id}`,
  },
  donations: {
    accounts: () => 'donations:accounts',
  },
  forms: {
    summary: () => 'forms:summary',
  },
}

/**
 * 게시된 스토리 캐시 가져오기/저장
 */
export async function getCachedStories(
  category?: string,
  page: number = 1
): Promise<any[] | null> {
  const key = cacheKeys.stories.list(category, page)
  return getCache<any[]>(key)
}

export async function setCachedStories(
  stories: any[],
  category?: string,
  page: number = 1,
  ttl: number = 300
): Promise<void> {
  const key = cacheKeys.stories.list(category, page)
  await setCache(key, stories, ttl)
}

/**
 * 후원 계좌 캐시
 */
export async function getCachedDonationAccounts(): Promise<any[] | null> {
  const key = cacheKeys.donations.accounts()
  return getCache<any[]>(key)
}

export async function setCachedDonationAccounts(
  accounts: any[],
  ttl: number = 3600 // 1시간
): Promise<void> {
  const key = cacheKeys.donations.accounts()
  await setCache(key, accounts, ttl)
}
