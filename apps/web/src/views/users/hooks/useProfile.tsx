import { createContext, useContext } from 'react';

import type { User } from '@/gql';

export interface ProfileContextData {
  user?: User;
}

export const ProfileContext = createContext<ProfileContextData>(
  {} as ProfileContextData,
);

export function useProfile(): ProfileContextData {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error('useProfile must be used within an provider');
  }

  return context;
}
