import {
  createContext,
  useCallback,
  useState,
  useContext,
  useMemo,
  useEffect,
} from 'react';

import type { PropsWithChildren, Dispatch, SetStateAction } from 'react';

import { useLazyQuery, useMutation } from '@apollo/client';

import type { FetchResult } from '@apollo/client';

import type { SignInCredentials } from '../types';

import type { UserData } from '../graphql/User/types';

import { FIND_USER, SIGN_IN } from '../graphql/User';

type SignInResponse = { login: UserData };

interface AuthContextData {
  user?: UserData;
  setUser: Dispatch<SetStateAction<UserData>>;

  signIn: (
    credentials: SignInCredentials,
  ) => Promise<FetchResult<SignInResponse> | null>;
  signOut: () => void;
  updateUser: () => void;

  removeFavoriteMovie: (movieId: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<UserData>();

  const [mutationSignIn] = useMutation<SignInResponse>(SIGN_IN);

  const [findUser] = useLazyQuery<{ user: UserData }>(FIND_USER);

  const signIn = useCallback(
    async ({ username }: SignInCredentials) => {
      const fetchUser = await mutationSignIn({
        variables: { username },
      });

      if (fetchUser.data) {
        const userData = fetchUser.data.login;

        localStorage.setItem('@MovieHouse:token', userData.id);

        setUser(userData);
      }

      return fetchUser;
    },
    [setUser],
  );

  const signOut = useCallback(() => {
    localStorage.removeItem('@MovieHouse:token');
    setUser(undefined);
  }, [setUser]);

  useEffect(() => {
    const fetchUser = async () => {
      const localStorageToken = localStorage.getItem('@MovieHouse:token');

      if (localStorageToken) {
        const userResponse = await findUser({
          variables: { userId: localStorageToken },
        });

        if (userResponse.data) {
          setUser(userResponse.data.user);
        }
      }
    };

    fetchUser();
  }, []);

  const value = useMemo(
    () =>
      ({
        user,
        setUser,

        signIn,
        signOut,
      } as AuthContextData),
    [user, setUser, signIn, signOut],
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
