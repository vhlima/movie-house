import type { PropsWithChildren } from 'react';

interface BackdropProps {
  onClick: () => void;
}

const Backdrop: React.FC<PropsWithChildren<BackdropProps>> = ({
  onClick,
  children,
}) => (
  <div
    className="absolute w-screen h-screen overflow-hidden bg-black bg-opacity-50 z-40"
    role="presentation"
    onClick={onClick}
  >
    {children}
  </div>
);

export default Backdrop;
