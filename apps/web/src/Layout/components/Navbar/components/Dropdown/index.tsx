import { useEffect } from 'react';

import type { PropsWithChildren } from 'react';

import { useRouter } from 'next/router';

import { motion } from 'framer-motion';

import { useOutsideClick } from '@/hooks/useOutsideClick';

export interface DropdownProps {
  tabIndex?: number;
  onClose: () => void;
}

const Dropdown: React.FC<PropsWithChildren<DropdownProps>> = ({
  tabIndex,
  onClose,
  children,
}) => {
  const { events } = useRouter();

  const { elementRef, handleBlur } = useOutsideClick<HTMLDivElement>();

  useEffect(() => {
    events.on('routeChangeStart', onClose);

    return () => {
      events.off('routeChangeStart', onClose);
    };
  }, [events, onClose]);

  useEffect(() => {
    if (elementRef.current) {
      elementRef.current.focus();
    }
  }, [elementRef]);

  return (
    <motion.div
      className="absolute w-full bg-grey-800 rounded-b-md z-20 right-0 sm:left-0 top-full overflow-hidden"
      ref={elementRef}
      tabIndex={tabIndex && tabIndex}
      onBlur={e => handleBlur(e, onClose)}
      initial={{ y: -15, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -15, opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};

export default Dropdown;
