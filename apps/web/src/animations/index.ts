import type { MotionProps } from 'framer-motion';

export const modalBottom: MotionProps = {
  initial: 'hidden',
  animate: 'visible',
  exit: {
    y: '80%',
    transition: {
      duration: 0.2,
    },
  },
  variants: {
    hidden: { opacity: 0, y: '80%' },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
      },
    },
  },
};
