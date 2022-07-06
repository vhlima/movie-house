import React, { useState } from 'react';

import { AnimatePresence } from 'framer-motion';

import { useAuth } from '../../../hooks/useAuth';

import Link from '../../../components/Link';

import SearchBar from './components/SearchBar';
import NavigationMenu from './components/NavigationMenu';
import AuthenticationModal from './components/AuthenticationModal';
import Notifications from './components/Notifications';

import NavButton from '../NavButton';
import Logo from '../../../components/Logo';

type NavWindowType = 'auth' | 'menu' | 'search' | 'notifications' | '';

const Navbar: React.FC = () => {
  const { user } = useAuth();

  const [currentWindow, setCurrentWindow] = useState<NavWindowType>('');

  const openWindow = (window: NavWindowType) => {
    setCurrentWindow(prev => (prev !== window ? window : ''));
  };

  const closeWindow = () => {
    setCurrentWindow('');
  };

  return (
    <>
      {!user && currentWindow === 'auth' && (
        <AuthenticationModal onClose={closeWindow} />
      )}

      <nav className="relative bg-grey-800">
        <div className="flex items-center gap-2 p-3">
          <Link href="/">
            <Logo showText />
          </Link>

          <div className="flex items-center ml-auto text-grey-300">
            <NavButton
              iconType={!user ? 'FaUserAlt' : 'BsFillBellFill'}
              size={18}
              onClick={() => openWindow(!user ? 'auth' : 'notifications')}
            />

            <NavButton
              iconType="FaSearch"
              size={18}
              onClick={() => openWindow('search')}
            />

            <NavButton
              iconType={currentWindow !== 'menu' ? 'HiMenu' : 'FiX'}
              size={26}
              onClick={() => openWindow('menu')}
            />
          </div>
        </div>

        <AnimatePresence>
          {user && currentWindow === 'notifications' && (
            <Notifications onClose={closeWindow} />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {currentWindow === 'menu' && <NavigationMenu onClose={closeWindow} />}
        </AnimatePresence>

        {currentWindow === 'search' && <SearchBar onClose={closeWindow} />}
      </nav>
    </>
  );
};

export default Navbar;
