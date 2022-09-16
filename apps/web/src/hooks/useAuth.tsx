import {
  createContext,
  useCallback,
  useState,
  useContext,
  useMemo,
  useEffect,
} from 'react';

import type { PropsWithChildren } from 'react';

import type { User, SignInMutationVariables } from '../graphql';

import { useSignInMutation, useFindUserLazyQuery } from '../graphql';

interface AuthContextData {
  user?: User;

  signIn: (credentials: SignInMutationVariables) => Promise<boolean>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User>(null);

  const [mutationSignIn] = useSignInMutation();

  const [findUser] = useFindUserLazyQuery();

  const signIn = useCallback(
    async ({ username }: SignInMutationVariables) => {
      const { data, errors } = await mutationSignIn({
        variables: { username },
      });

      if (!errors && data) {
        const userData = data.login as User;

        localStorage.setItem('@MovieHouse:token', userData.id);

        setUser(userData);
        return true;
      }

      return false;
    },
    [setUser],
  );

  const signOut = useCallback(() => {
    localStorage.removeItem('@MovieHouse:token');
    setUser(undefined);
  }, [setUser]);

  /* Login Persistance */
  useEffect(() => {
    const fetchUser = async () => {
      const localStorageToken = localStorage.getItem('@MovieHouse:token');

      if (localStorageToken) {
        const { data, error } = await findUser({
          variables: { userId: localStorageToken },
        });

        if (!error && data) {
          setUser(data.user as User);
        }
      }
    };

    fetchUser();
  }, []);

  const value = useMemo(
    () =>
      ({
        user,

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
