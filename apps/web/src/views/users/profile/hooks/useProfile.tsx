import { createContext, useContext, useMemo } from 'react';

import type { PropsWithChildren } from 'react';

import { useRouter } from 'next/router';

import type { User } from '../../../../graphql';

import { useFindUserQuery } from '../../../../graphql';

export interface ProfileContextData {
  user?: User;
}

export const ProfileContext = createContext<ProfileContextData>(
  {} as ProfileContextData,
);

// export const ProfileContextProvider: React.FC<PropsWithChildren> = ({
//   children,
// }) => {
//   const { query } = useRouter();

//   const { data } = useFindUserQuery({
//     variables: { username: query.username as string },
//   });

//   const contextProvider = useMemo(
//     () => ({ user: data?.user } as ProfileContextData),
//     [data],
//   );

//   return (
//     <ProfileContext.Provider value={contextProvider}>
//       {children}
//     </ProfileContext.Provider>
//   );
// };

export function useProfile(): ProfileContextData {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error('useProfile must be used within an provider');
  }

  return context;
}
