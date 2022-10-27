import { PropsWithChildren } from 'react';

import { AuthProvider } from './useAuth';

const Hooks: React.FC<PropsWithChildren> = ({ children }) => (
  <AuthProvider>{children}</AuthProvider>
);

export default Hooks;
