import { useEffect, useMemo } from 'react';

import type { PropsWithChildren } from 'react';

import { useRouter } from 'next/router';

import { MotionProps, motion } from 'framer-motion';

export interface DropdownProps {
  onClose: () => void;
}

const Dropdown: React.FC<PropsWithChildren<DropdownProps>> = ({
  onClose,
  children,
}) => {
  const { events } = useRouter();

  const animation: MotionProps = useMemo(
    () => ({
      initial: { y: -15, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      exit: { y: -15, opacity: 0 },
    }),
    [],
  );

  useEffect(() => {
    events.on('routeChangeStart', onClose);

    return () => {
      events.off('routeChangeStart', onClose);
    };
  }, [events, onClose]);

  return (
    <motion.div
      className="absolute w-full p-3 bg-grey-800 rounded-b-md z-20 right-0 sm:left-0 top-14"
      initial={{ y: -15, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -15, opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};

export default Dropdown;
