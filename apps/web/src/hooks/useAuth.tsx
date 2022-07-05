import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useState,
  useContext,
  useMemo,
} from 'react';

import { FetchResult, useMutation } from '@apollo/client';

import { SignInCredentials, UserData } from '../types';

import { SIGN_IN } from '../graphql/user';

type SignInResponse = { userLogin: UserData };

interface AuthContextData {
  user: UserData;
  followUser: (userId: string) => Promise<void>;
  unfollowUser: (userId: string) => Promise<void>;
  signIn(credentials: SignInCredentials): Promise<FetchResult<SignInResponse>>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<UserData>();

  const [mutationSignIn] = useMutation<SignInResponse>(SIGN_IN);

  const followUser = async (userId: string) => {
    if (!user) return;

    const a = '1';
  };

  const unfollowUser = async (userId: string) => {
    if (!user) return;

    const b = '2';
  };

  const signIn = useCallback(
    async ({ username }: SignInCredentials) => {
      const fetchUser = await mutationSignIn({
        variables: { username },
      });

      if (fetchUser.data) {
        setUser(fetchUser.data.userLogin);
      }

      // const fetchUser = await fetcher<UserData[]>(`/api/users/`);

      return fetchUser;
    },
    [setUser],
  );

  const signOut = useCallback(() => {
    setUser(undefined);
  }, [setUser]);

  const value = useMemo(
    () =>
      ({
        user,
        followUser,
        unfollowUser,
        signIn,
        signOut,
      } as AuthContextData),
    [user, signIn, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
