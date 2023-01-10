import type { PropsWithChildren } from 'react';

const ModalHeader: React.FC<PropsWithChildren> = ({ children }) => (
  <div className="relative mb-4 pb-4 border-b border-b-grey-700">
    {children}
  </div>
);

export default ModalHeader;
