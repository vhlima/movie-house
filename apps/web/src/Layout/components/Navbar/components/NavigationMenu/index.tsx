import React, { useEffect } from 'react';

import { useRouter } from 'next/router';

import { MotionProps, motion } from 'framer-motion';

import { useAuth } from '../../../../../hooks/useAuth';

import MenuLink from './components/MenuLink';

interface NavigationMenuProps {
  animation: MotionProps;
  onClose: () => void;
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({
  animation,
  onClose,
}) => {
  const { user } = useAuth();

  const { events } = useRouter();

  useEffect(() => {
    events.on('routeChangeStart', onClose);

    return () => {
      events.off('routeChangeStart', onClose);
    };
  }, [events, onClose]);

  return (
    <motion.div className="absolute w-full bg-inherit z-40" {...animation}>
      <ul className="p-4">
        {user && (
          <MenuLink
            href={{
              pathname: '/users/[id]',
              query: { id: user._id },
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
