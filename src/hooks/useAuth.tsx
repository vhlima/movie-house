import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useState,
  useContext,
  useMemo,
} from 'react';

import { fakeUser } from '../data/fakeData';

interface SignInCredentials {
  login: string;
  password: string;
}

export interface UserProps {
  id: string;
  username: string;
  fullName: string;
  profilePictureUrl: string;
}

interface AuthContextData {
  user: UserProps;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<UserProps>();

  const signIn = useCallback(async () => {
    setUser(fakeUser);
  }, [setUser]);

  const signOut = useCallback(() => {
    setUser(undefined);
  }, [setUser]);

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
