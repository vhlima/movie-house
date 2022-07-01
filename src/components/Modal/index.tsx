import React, { PropsWithChildren, Children } from 'react';

import { createPortal } from 'react-dom';

interface ModalProps {
  portalId: string;
}

const Modal: React.FC<PropsWithChildren<ModalProps>> = ({
  portalId,
  children,
}) =>
  createPortal(
    Children.only(children),
    document.getElementById(portalId) || document.body,
  );

export default Modal;
