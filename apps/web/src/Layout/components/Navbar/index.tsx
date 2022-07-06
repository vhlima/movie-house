import React, { useState } from 'react';

import { AnimatePresence } from 'framer-motion';

import { useAuth } from '../../../hooks/useAuth';

import Link from '../../../components/Link';

import SearchBar from './components/SearchBar';
import NavigationMenu from './components/NavigationMenu';
import AuthenticationModal from './components/AuthenticationModal';
import Notifications from './components/Notifications';
import SvgIcon from '../../../components/SvgIcon';

import NavButton from '../NavButton';

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
          <Link className="flex items-center gap-2 select-none" href="/">
            <SvgIcon
              className="text-movieHouse-dark"
              iconType="BsHouse"
              size={22}
              strokeWidth={1}
            />

            <h1 className="text-grey-100 font-mono font-semibold text-2xl">
              MovieHouse
            </h1>
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
