import { SignJWT, jwtVerify } from 'jose';
import { config } from '../config/env';

const secretKey = new TextEncoder().encode(config.JWT_SECRET);

export const COOKIE_NAME = config.COOKIE_NAME;

export interface TokenPayload {
  username: string;
  role?: string;
}

/**
 * Sign an admin JWT with 7-day expiration
 */
export async function signAdminToken(payload: TokenPayload): Promise<string> {
  return await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secretKey);
}

/**
 * Verify an admin JWT
 */
export async function verifyAdminToken(token: string): Promise<TokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    return payload as unknown as TokenPayload;
  } catch {
    return null;
  }
}
