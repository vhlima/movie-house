import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useState,
  useContext,
  useMemo,
} from 'react';

import { UserData } from '../types';

import { fetcher } from '../utils';

interface SignInCredentials {
  login: string;
  password: string;
}

export interface UserProps {
  id: string;
  username: string;
  fullName: string;
  profilePictureUrl: string;
  followers: string[];
  following: string[];
}

interface AuthContextData {
  user: UserProps;
  followUser: (userId: string) => Promise<void>;
  unfollowUser: (userId: string) => Promise<void>;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<UserProps>();

  const followUser = async (userId: string) => {
    if (!user) return;

    const a = '1';
  };

  const unfollowUser = async (userId: string) => {
    if (!user) return;

    const b = '2';
  };

  const signIn = useCallback(async () => {
    const fetchUser = await fetcher<UserData[]>(`/api/users/`);

    setUser(fetchUser[0]);
  }, [setUser]);

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
