import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useState,
  useContext,
  useMemo,
  useEffect,
} from 'react';

import { FetchResult, useMutation } from '@apollo/client';

import { SignInCredentials, UserData } from '../types';

import { SIGN_IN } from '../graphql/user';

type SignInResponse = { userLogin: UserData };

interface AuthContextData {
  user: UserData | undefined;
  signIn(
    credentials: SignInCredentials,
  ): Promise<FetchResult<SignInResponse> | null>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<UserData | undefined>();

  const [mutationSignIn] = useMutation<SignInResponse>(SIGN_IN);

  const signIn = useCallback(
    async ({ username }: SignInCredentials) => {
      const fetchUser = await mutationSignIn({
        variables: { username },
      });

      if (fetchUser.data) {
        const userData = fetchUser.data.userLogin;

        localStorage.setItem('@MovieHouse:user', JSON.stringify(userData));

        setUser(userData);
      }

      return fetchUser;
    },
    [setUser],
  );

  const signOut = useCallback(() => {
    localStorage.removeItem('@MovieHouse:user');
    setUser(undefined);
  }, [setUser]);

  useEffect(() => {
    const localStorageUser = localStorage.getItem('@MovieHouse:user');

    if (localStorageUser) {
      setUser(JSON.parse(localStorageUser));
    }
  }, []);

  const value = useMemo(
    () =>
      ({
        user,
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
