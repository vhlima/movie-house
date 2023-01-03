import { useState } from 'react';

import { AnimatePresence } from 'framer-motion';

import { useAuth } from '../../../hooks/useAuth';

import Link from '../../../components/Link';

import Logo from '../../../components/Logo';

import SearchBar from './components/SearchBar';

import Notifications from './components/Notifications';

import NavigationMenu from './components/NavigationMenu';

import SvgIcon from '../../../components/SvgIcon';

import LoginModal from './components/LoginModal';

type NavWindowType = 'auth' | 'menu' | 'search' | 'notifications' | '';

const Navbar: React.FC = () => {
  const { data } = useAuth();

  const [currentWindow, setCurrentWindow] = useState<NavWindowType>('');

  const openWindow = (window: NavWindowType) => {
    setCurrentWindow(prev => (prev !== window ? window : ''));
  };

  const closeWindow = () => {
    setCurrentWindow('');
  };

  return (
    <>
      {!data && currentWindow === 'auth' && (
        <LoginModal onClose={closeWindow} />
      )}

      <nav className="bg-grey-800">
        <div className="flex items-center gap-2 p-3 relative mx-auto max-w-5xl">
          <AnimatePresence>
            {data && currentWindow === 'notifications' && (
              <Notifications onClose={closeWindow} />
            )}
          </AnimatePresence>

          <AnimatePresence>
            {currentWindow === 'menu' && (
              <NavigationMenu onClose={closeWindow} />
            )}
          </AnimatePresence>

          {currentWindow === 'search' && <SearchBar onClose={closeWindow} />}

          <Link href="/">
            <Logo showText />
          </Link>

          <div className="flex items-center ml-auto text-grey-300">
            {!data && (
              <button type="button" onClick={() => openWindow('auth')}>
                <SvgIcon iconType="FaUserAlt" size={18} />
              </button>
            )}

            {/* <NavButton
              iconType="FaSearch"
              size={18}
              onClick={() => openWindow('search')}
            /> */}

            <button type="button" onClick={() => openWindow('menu')}>
              <SvgIcon
                iconType={currentWindow !== 'menu' ? 'HiMenu' : 'FiX'}
                size={26}
              />
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
