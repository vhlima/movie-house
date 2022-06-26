import React, { useMemo } from 'react';

import { MotionProps, motion } from 'framer-motion';

import { BsFillCollectionFill } from 'react-icons/bs';

import { FaListUl, FaUsers } from 'react-icons/fa';

import { IoIosJournal } from 'react-icons/io';

import MenuLink from './components/MenuLink';

const NavigationMenu: React.FC = () => {
  const menuAnimation: MotionProps = useMemo(
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

  return (
    <motion.div className="absolute w-full bg-inherit z-40" {...menuAnimation}>
      <ul className="p-4">
        <MenuLink href="/" text="Films" icon={BsFillCollectionFill} />
        <MenuLink href="/" text="Lists" icon={FaListUl} />
        <MenuLink href="/" text="Members" icon={FaUsers} />
        <MenuLink href="/" text="Journal" icon={IoIosJournal} />
      </ul>
    </motion.div>
  );
};

export default NavigationMenu;
