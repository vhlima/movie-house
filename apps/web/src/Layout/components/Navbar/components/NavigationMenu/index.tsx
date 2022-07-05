import React from 'react';

import { MotionProps, motion } from 'framer-motion';

import { useAuth } from '../../../../../hooks/useAuth';

import MenuLink from './components/MenuLink';

interface NavigationMenuProps {
  animation: MotionProps;
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({ animation }) => {
  const { user } = useAuth();

  return (
    <motion.div className="absolute w-full bg-inherit z-40" {...animation}>
      <ul className="p-4">
        {user && (
          <MenuLink
            href={{
              pathname: '/users/[userId]',
              query: { userId: user.id },
            }}
            text="My Profile"
            icon="FaRegUserCircle"
          />
        )}

        <MenuLink href="/" text="Films" icon="BsFillCollectionFill" />
        <MenuLink href="/" text="Lists" icon="FaListUl" />
        <MenuLink href="/" text="Members" icon="FaUsers" />
        <MenuLink href="/" text="Journal" icon="IoIosJournal" />
      </ul>
    </motion.div>
  );
};

export default NavigationMenu;
