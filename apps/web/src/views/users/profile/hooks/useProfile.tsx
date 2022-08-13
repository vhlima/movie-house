import { createContext, useContext } from 'react';

import type { UserData } from '../../../../graphql/User/types';

export interface ProfileContextData {
  user: UserData;
}

export const ProfileContext = createContext<ProfileContextData>(
  {} as ProfileContextData,
);

export function useProfile(): ProfileContextData {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error('useProfile must be used within an AuthProvider');
  }

  return context;
}

// export const ProfileProvider: React.FC<
//   PropsWithChildren<ProfileContextProps>
// > = ({ children }) => {
//   const [user, setUser] = useState<UserResponse>();

//   const value = useMemo(
//     () =>
//       ({
//         user,
//       } as ProfileContextProps),
//     [user],
//   );

//   return (
//     <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
//   );
// };
