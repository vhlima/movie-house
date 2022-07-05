import { MotionProps } from 'framer-motion';

export const dropdownAnimation: MotionProps = {
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
};
