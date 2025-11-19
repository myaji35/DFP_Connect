import crypto from 'crypto'

const ALGORITHM = 'aes-256-gcm'
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || ''

if (!ENCRYPTION_KEY && process.env.NODE_ENV === 'production') {
  throw new Error('ENCRYPTION_KEY is required in production')
}

// 암호화 키 검증 (32 bytes = 64 hex characters)
function getEncryptionKey(): Buffer {
  if (!ENCRYPTION_KEY) {
    // 개발 환경에서 임시 키 사용 (절대 프로덕션에서 사용 금지)
    console.warn('⚠️ Using temporary encryption key for development')
    return Buffer.from('0'.repeat(64), 'hex')
  }

  if (ENCRYPTION_KEY.length !== 64) {
    throw new Error('ENCRYPTION_KEY must be 64 hex characters (32 bytes)')
  }

  return Buffer.from(ENCRYPTION_KEY, 'hex')
}

/**
 * 문자열 암호화
 * @param text 암호화할 텍스트
 * @returns 암호화된 문자열 (iv:authTag:encrypted 형식)
 */
export function encrypt(text: string): string {
  if (!text) return ''

  const key = getEncryptionKey()
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv)

  const encrypted = Buffer.concat([
    cipher.update(text, 'utf8'),
    cipher.final(),
  ])

  const authTag = cipher.getAuthTag()

  // iv:authTag:encrypted 형식으로 반환
  return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted.toString('hex')}`
}

/**
 * 문자열 복호화
 * @param encryptedText 암호화된 텍스트 (iv:authTag:encrypted 형식)
 * @returns 복호화된 문자열
 */
export function decrypt(encryptedText: string): string {
  if (!encryptedText) return ''

  const key = getEncryptionKey()
  const parts = encryptedText.split(':')

  if (parts.length !== 3) {
    throw new Error('Invalid encrypted text format')
  }

  const [ivHex, authTagHex, encryptedHex] = parts
  const iv = Buffer.from(ivHex, 'hex')
  const authTag = Buffer.from(authTagHex, 'hex')
  const encrypted = Buffer.from(encryptedHex, 'hex')

  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv)
  decipher.setAuthTag(authTag)

  const decrypted = Buffer.concat([
    decipher.update(encrypted),
    decipher.final(),
  ])

  return decrypted.toString('utf8')
}

/**
 * 전화번호 마스킹 (표시용)
 * @param phone 전화번호
 * @returns 마스킹된 전화번호 (예: 010-****-5678)
 */
export function maskPhone(phone: string): string {
  if (!phone) return ''

  // 숫자만 추출
  const numbers = phone.replace(/\D/g, '')

  if (numbers.length === 11) {
    return `${numbers.slice(0, 3)}-****-${numbers.slice(-4)}`
  }

  return phone.slice(0, 3) + '*'.repeat(phone.length - 6) + phone.slice(-3)
}

/**
 * 이메일 마스킹 (표시용)
 * @param email 이메일
 * @returns 마스킹된 이메일 (예: abc***@example.com)
 */
export function maskEmail(email: string): string {
  if (!email || !email.includes('@')) return email

  const [local, domain] = email.split('@')

  if (local.length <= 3) {
    return `${local[0]}***@${domain}`
  }

  return `${local.slice(0, 3)}***@${domain}`
}
