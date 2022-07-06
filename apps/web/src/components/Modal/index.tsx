import React, { PropsWithChildren } from 'react';

import clsx from 'clsx';

import { createPortal } from 'react-dom';

import { MotionProps, motion } from 'framer-motion';

import Backdrop from '../Backdrop';

interface ModalProps {
  className?: string;
  portalId?: string;
  animation?: MotionProps;
  onClickBackdrop?: () => void;
}

const PORTAL_ID = 'modalPortal';

const Modal: React.FC<PropsWithChildren<ModalProps>> = ({
  className,
  animation,
  onClickBackdrop,
  children,
}) => {
  const body = (
    <motion.div
      className={clsx('p-4 bg-grey-800 z-50', className)}
      role="presentation"
      onClick={e => e.stopPropagation()}
      {...animation}
    >
      {children}
    </motion.div>
  );

  const modal = !onClickBackdrop ? (
    body
  ) : (
    <Backdrop onClick={onClickBackdrop}>{body}</Backdrop>
  );

  // fixed top-1/4 left-1/2 transform -translate-x-1/2 w-11/12 rounded-md
  // absolute bottom-0 w-full rounded-t-md z-50

  return createPortal(
    modal,
    document.getElementById(PORTAL_ID) || document.body,
  );
};

export default Modal;
