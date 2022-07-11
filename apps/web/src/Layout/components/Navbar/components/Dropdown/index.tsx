import React, { PropsWithChildren, useEffect, useMemo } from 'react';

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
      initial: 'hidden',
      animate: 'visible',
      exit: {
        y: '-10%',
        transition: {
          duration: 0.2,
        },
      },
      variants: {
        hidden: { opacity: 0, y: '-20%' },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.2,
          },
        },
      },
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
    <motion.div className="absolute w-full bg-inherit z-20" {...animation}>
      {children}
    </motion.div>
  );
};

export default Dropdown;
