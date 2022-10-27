import {
  createContext,
  useCallback,
  useState,
  useContext,
  useMemo,
} from 'react';

import type { PropsWithChildren } from 'react';

import { useSession } from 'next-auth/react';
import type { User } from '../graphql';

interface AuthContextData {
  user?: User;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User>(null);

  const { data } = useSession();

  console.log(`use session data? ${JSON.stringify(data)}`);

  const signIn = useCallback(
    async ({ username }) => {
      // const { data, errors } = await mutationSignIn({
      //   variables: { username },
      // });

      // if (!errors && data) {
      //   const userData = data.login as User;

      //   localStorage.setItem('@MovieHouse:token', userData.username);

      //   setUser(userData);
      //   return true;
      // }

      const a = 1;

      return false;
    },
    [setUser],
  );

  const signOut = useCallback(() => {
    localStorage.removeItem('@MovieHouse:token');
    setUser(undefined);
  }, [setUser]);

  /* Login Persistance */
  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const localStorageToken = localStorage.getItem('@MovieHouse:token');

  //     if (localStorageToken) {
  //       const { data, error } = await findUser({
  //         variables: { username: localStorageToken },
  //       });

  //       if (!error && data) {
  //         setUser(data.user as User);
  //       }
  //     }
  //   };

  //   fetchUser();
  // }, []);

  const value = useMemo(
    () =>
      ({
        user,
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
