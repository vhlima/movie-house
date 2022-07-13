import { PropsWithChildren } from 'react';

import clsx from 'clsx';

import { createPortal } from 'react-dom';

import { motion } from 'framer-motion';

import type { MotionProps } from 'framer-motion';

import Backdrop from '../Backdrop';

export interface ModalProps {
  animation?: MotionProps;
}

export interface ModalHandles {
  onClose?: () => void;
}

interface ModalInternalProps extends ModalProps, ModalHandles {
  className?: string;
  portalId?: string;
  center?: boolean;
  bottom?: boolean;
  backdrop?: boolean;
}

const PORTAL_ID = 'modalPortal';

const Modal: React.FC<PropsWithChildren<ModalInternalProps>> = ({
  className,
  animation,
  center,
  bottom,
  backdrop,
  onClose,
  children,
}) => {
  const body = (
    <motion.div
      className={clsx('p-4 bg-grey-800 z-50', className, {
        'fixed top-1/4 left-1/2 transform -translate-x-1/2 w-11/12 rounded-md':
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
    <Backdrop onClick={onClose}>{body}</Backdrop>
  );

  // fixed top-1/4 left-1/2 transform -translate-x-1/2 w-11/12 rounded-md
  // absolute bottom-0 w-full rounded-t-md z-50

  return createPortal(
    modal,
    document.getElementById(PORTAL_ID) || document.body,
  );
};

export default Modal;
