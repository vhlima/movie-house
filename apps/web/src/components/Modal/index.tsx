import { PropsWithChildren } from 'react';

import clsx from 'clsx';

import { createPortal } from 'react-dom';

import { motion } from 'framer-motion';

import type { MotionProps } from 'framer-motion';

import ModalHeader from './components/ModalHeader';

import ModalTitle from './components/ModalTitle';

import ModalCloseButton from './components/ModalCloseButton';

export interface ModalProps {
  animation?: MotionProps;
}

export interface ModalHandles {
  onClose: () => void;
}

interface ModalInternalProps extends ModalProps, Partial<ModalHandles> {
  className?: string;
  portalId?: string;
  center?: boolean;
  bottom?: boolean;
  backdrop?: boolean;
  autoStyle?: boolean;
}

interface ModalSubComponents {
  Header: typeof ModalHeader;
  Title: typeof ModalTitle;
  CloseButton: typeof ModalCloseButton;
}

const PORTAL_ID = 'modalPortal';

const Modal: React.FC<PropsWithChildren<ModalInternalProps>> &
  ModalSubComponents = ({
  className,
  animation,
  center,
  bottom,
  backdrop,
  autoStyle = true,
  onClose,
  children,
}) => {
  const body = (
    <motion.div
      className={clsx('z-50 bg-grey-800', className, {
        'p-4': autoStyle,
        'fixed top-1/4 left-1/2 transform -translate-x-1/2 rounded-md w-full sm:w-3/4 lg:max-w-2xl lg:w-2/4':
          center,
        'absolute bottom-0 w-full rounded-t-md': bottom,
      })}
      role="presentation"
      onClick={e => e.stopPropagation()}
      {...animation}
    >
      {children}
    </motion.div>
  );

  const modal = !backdrop ? (
    body
  ) : (
    <div
      className="absolute w-screen h-screen overflow-hidden bg-black bg-opacity-50 z-40"
      role="presentation"
      onClick={onClose}
    >
      {body}
    </div>
  );

  return createPortal(
    modal,
    document.getElementById(PORTAL_ID) || document.body,
  );
};

Modal.Header = ModalHeader;

Modal.Title = ModalTitle;

Modal.CloseButton = ModalCloseButton;

export default Modal;
