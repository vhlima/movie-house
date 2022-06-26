import React, { PropsWithChildren } from 'react';

interface BackdropProps {
  onClick: () => void;
}

const Backdrop: React.FC<PropsWithChildren<BackdropProps>> = ({
  onClick,
  children,
}) => (
  <div
    className="absolute w-screen h-screen bg-black bg-opacity-50 z-30"
    role="presentation"
    onClick={onClick}
    onKeyDown={onClick}
  >
    {children}
  </div>
);

export default Backdrop;
