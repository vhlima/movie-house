import { PropsWithChildren } from 'react';

import clsx from 'clsx';

import { createPortal } from 'react-dom';

import { motion } from 'framer-motion';

import type { MotionProps } from 'framer-motion';

import SvgIcon from '../SvgIcon';

import Backdrop from '../Backdrop';

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
  showX?: boolean;
}

const PORTAL_ID = 'modalPortal';

const Modal: React.FC<PropsWithChildren<ModalInternalProps>> = ({
  className,
  animation,
  center,
  bottom,
  backdrop,
  showX = true,
  autoStyle = true,
  onClose,
  children,
}) => {
  const body = (
    <motion.div
      className={clsx('z-50', className, {
        'p-4 bg-grey-800': autoStyle,
        'fixed top-1/4 left-1/2 transform -translate-x-1/2 w-11/12 rounded-md':
          center,
        'absolute bottom-0 w-full rounded-t-md': bottom,
      })}
      role="presentation"
      onClick={e => e.stopPropagation()}
      {...animation}
    >
      {showX && (
        <button className="absolute right-4" type="button" onClick={onClose}>
          <SvgIcon className="text-danger-light" iconType="FiX" size={28} />
        </button>
      )}

      {children}
    </motion.div>
  );

  const modal = !backdrop ? (
    body
  ) : (
    <Backdrop onClick={onClose}>{body}</Backdrop>
  );

  return createPortal(
    modal,
    document.getElementById(PORTAL_ID) || document.body,
  );
};

export default Modal;
