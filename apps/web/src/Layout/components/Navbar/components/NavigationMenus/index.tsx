import { useState } from 'react';

import { AnimatePresence } from 'framer-motion';

import { useAuth } from '../../../../../hooks/useAuth';

import SvgIcon from '../../../../../components/SvgIcon';

import SearchBar from './components/SearchBar';
import LoginModal from './components/LoginModal';
import Notifications from './components/Notifications';
import NavigationMenu from './components/NavigationMenu';

type NavModalType = 'auth' | 'menu' | 'search' | 'notifications';

const NavigationMenus: React.FC = () => {
  const { data: session } = useAuth();

  const [currentModal, setCurrentModal] = useState<NavModalType>();

  function openModal(modalType: NavModalType) {
    setCurrentModal(previousType =>
      previousType === modalType ? undefined : modalType,
    );
  }

  function closeModal() {
    setCurrentModal(undefined);
  }

  return (
    <>
      {!session && currentModal && currentModal === 'auth' && (
        <LoginModal onClose={() => closeModal()} />
      )}

      {currentModal && currentModal !== 'auth' && (
        <AnimatePresence>
          {currentModal === 'menu' && (
            <NavigationMenu onClose={() => closeModal()} />
          )}

          {currentModal === 'notifications' && (
            <Notifications onClose={() => closeModal()} />
          )}

          {currentModal === 'search' && (
            <SearchBar onClose={() => closeModal()} />
          )}
        </AnimatePresence>
      )}

      <div className="flex items-center ml-auto text-grey-300">
        <button
          className="p-2"
          type="button"
          onClick={() => openModal('search')}
        >
          <SvgIcon iconType="FaSearch" size={18} />
        </button>

        {!session ? (
          <button
            className="p-2"
            type="button"
            onClick={() => openModal('auth')}
          >
            <SvgIcon iconType="FaUserAlt" size={18} />
          </button>
        ) : (
          <button
            className="p-2"
            type="button"
            onClick={() => openModal('notifications')}
          >
            <SvgIcon iconType="BsFillBellFill" size={18} />
          </button>
        )}

        <button className="p-2" type="button" onClick={() => openModal('menu')}>
          <SvgIcon
            iconType={currentModal !== 'menu' ? 'FaBars' : 'FaTimes'}
            size={18}
          />
        </button>
      </div>
    </>
  );
};

export default NavigationMenus;
