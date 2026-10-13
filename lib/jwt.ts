import { SignJWT, jwtVerify } from 'jose';

const JWT_SECRET =
  process.env.JWT_SECRET ||
  'brian_jamison_okc_inline_editor_secret_jwt_key_2026_secure';

const secretKey = new TextEncoder().encode(JWT_SECRET);

export const COOKIE_NAME = 'admin_token';

export async function signAdminToken(payload: {
  username: string;
  role?: string;
}): Promise<string> {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secretKey);
}

export async function verifyAdminToken(
  token: string
): Promise<{ username: string; role?: string } | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    return payload as { username: string; role?: string };
  } catch {
    return null;
  }
}
