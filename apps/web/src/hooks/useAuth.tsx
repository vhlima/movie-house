import {
  useSession,
  signIn as signInNextAuth,
  signOut as signOutNextAuth,
} from 'next-auth/react';

export function useAuth() {
  const session = useSession();

  return session;
}

export function signOut() {
  return signOutNextAuth();
}

export function signIn() {
  return signInNextAuth();
}
