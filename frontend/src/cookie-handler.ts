import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { SessionUser } from 'types/users.type';

const key = new TextEncoder().encode(process.env.JWT_SECRET);

export async function encrypt(payload: SessionUser & { expires: Date }, expirationTimeInSeconds: string) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${expirationTimeInSeconds}seconds from now`)
    .sign(key);
}

export async function decrypt(input: string): Promise<SessionUser> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ['HS256'],
  });
  return payload as SessionUser;
}

export async function login(user: SessionUser, expires: Date) {
  const expirationTimeInSeconds = Math.abs(expires.getTime() - Date.now()) / 1000;
  const session = await encrypt({ ...user, expires }, expirationTimeInSeconds + '');
  // Save the session in a cookie
  cookies().set('session', session, { expires, httpOnly: true });
}

export async function logout() {
  // Destroy the session
  cookies().delete('session');
  cookies().delete('connect.sid');
  redirect('/');
}

export async function getSession(): Promise<SessionUser | null> {
  const session = cookies().get('session')?.value;
  if (!session) return null;
  return await decrypt(session);
}
