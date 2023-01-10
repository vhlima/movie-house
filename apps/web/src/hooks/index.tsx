import { PropsWithChildren, ReactElement, ReactNode } from 'react';

// import { AuthProvider } from './useAuth';

const Hooks: React.FC<PropsWithChildren> = ({ children }) =>
  children as ReactNode & ReactElement;

export default Hooks;
