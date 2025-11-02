import { createHmac, randomBytes, timingSafeEqual } from "crypto"

export const ADMIN_COOKIE_KEY = "astro-admin-auth"
export const ADMIN_SESSION_MAX_AGE_SECONDS = 60 * 60 * 12

const HMAC_ALGORITHM = "sha256"

const getCookieSecret = () => {
  const secret = process.env.ADMIN_COOKIE_SECRET

  if (!secret) {
    throw new Error("ADMIN_COOKIE_SECRET environment variable not set")
  }

  return secret
}

export const createSignedAdminSession = () => {
  const secret = getCookieSecret()
  const sessionId = randomBytes(32).toString("base64url")
  const expiresAt = Date.now() + ADMIN_SESSION_MAX_AGE_SECONDS * 1000
  const payload = `${sessionId}.${expiresAt}`
  const signature = createHmac(HMAC_ALGORITHM, secret).update(payload).digest("base64url")

  return {
    value: `${payload}.${signature}`,
    expiresAt,
  }
}

export const verifySignedAdminSession = (cookieValue?: string | null) => {
  if (!cookieValue) {
    return false
  }

  const parts = cookieValue.split(".")

  if (parts.length !== 3) {
    return false
  }

  const [sessionId, expiresAtRaw, signature] = parts
  const expiresAt = Number(expiresAtRaw)

  if (!sessionId || !Number.isFinite(expiresAt) || expiresAt <= Date.now()) {
    return false
  }

  const secret = process.env.ADMIN_COOKIE_SECRET

  if (!secret) {
    console.error("ADMIN_COOKIE_SECRET not configured; rejecting admin session validation")
    return false
  }

  const payload = `${sessionId}.${expiresAtRaw}`
  const expectedSignature = createHmac(HMAC_ALGORITHM, secret).update(payload).digest("base64url")
  const providedSignature = Buffer.from(signature, "base64url")
  const expectedSignatureBuffer = Buffer.from(expectedSignature, "base64url")

  if (providedSignature.length !== expectedSignatureBuffer.length) {
    return false
  }

  try {
    return timingSafeEqual(providedSignature, expectedSignatureBuffer)
  } catch {
    return false
  }
}
