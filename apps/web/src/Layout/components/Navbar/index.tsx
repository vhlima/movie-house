import { useState } from 'react';

import { AnimatePresence } from 'framer-motion';

import { useAuth } from '../../../hooks/useAuth';

import Link from '../../../components/Link';
import SvgIcon from '../../../components/SvgIcon';
import Notifications from './components/Notifications';
import NavigationMenu from './components/NavigationMenu';
import Typography from '../../../components/Typography';
import PageContent from '../../../components/PageContent';

import LoginModal from './components/LoginModal';

type NavWindowType = 'auth' | 'menu' | 'search' | 'notifications' | '';

const Navbar: React.FC = () => {
  const { data: session } = useAuth();

  const [currentWindow, setCurrentWindow] = useState<NavWindowType>('');

  const openWindow = (window: NavWindowType) => {
    setCurrentWindow(prev => (prev !== window ? window : ''));
  };

  const closeWindow = () => {
    setCurrentWindow('');
  };

  return (
    <>
      {!session && currentWindow === 'auth' && (
        <LoginModal onClose={closeWindow} />
      )}

      <nav className="bg-grey-800">
        <PageContent className="flex items-center gap-2 py-4 relative mx-auto max-w-5xl z-50">
          <AnimatePresence>
            {session && currentWindow === 'notifications' && (
              <Notifications onClose={closeWindow} />
            )}
          </AnimatePresence>

          <AnimatePresence>
            {currentWindow === 'menu' && (
              <NavigationMenu onClose={closeWindow} />
            )}
          </AnimatePresence>

          <Link className="flex items-center gap-2 select-none" href="/">
            <SvgIcon
              className="text-movieHouse-dark"
              iconType="BsHouse"
              size={24}
              strokeWidth={1}
            />

            <Typography
              className="font-mono font-bold"
              component="h1"
              color="primary"
              size="2xl"
            >
              MovieHouse
            </Typography>
          </Link>

          <div className="flex items-center gap-2 ml-auto text-grey-300">
            {!session && (
              <button type="button" onClick={() => openWindow('auth')}>
                <SvgIcon iconType="FaUserAlt" size={18} />
              </button>
            )}

            {/* <NavButton
              iconType="FaSearch"
              size={18}
              onClick={() => openWindow('search')}
            /> */}

            {session && (
              <button type="button" onClick={() => openWindow('notifications')}>
                <SvgIcon iconType="BsFillBellFill" size={18} />
              </button>
            )}

            <button type="button" onClick={() => openWindow('menu')}>
              <SvgIcon
                iconType={currentWindow !== 'menu' ? 'HiMenu' : 'FiX'}
                size={26}
              />
            </button>
          </div>
        </PageContent>
      </nav>
    </>
  );
};

export default Navbar;
