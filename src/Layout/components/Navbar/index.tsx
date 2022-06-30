import React, { useMemo, useState } from 'react';

import { AnimatePresence, MotionProps } from 'framer-motion';

import { FaSearch, FaUserAlt } from 'react-icons/fa';

import { BsHouse, BsFillBellFill } from 'react-icons/bs';

import { FiX } from 'react-icons/fi';

import { HiMenu } from 'react-icons/hi';

import { useAuth } from '../../../hooks/useAuth';

import Link from '../../../components/Link';

import SearchBar from './components/SearchBar';
import NavigationMenu from './components/NavigationMenu';
import AuthenticationModal from './components/AuthenticationModal';
import NotificationsModal from './components/NotificationsModal';

const Navbar: React.FC = () => {
  const { user } = useAuth();

  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
  const [isSearchBarOpen, setSearchBarOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [isNotificationModalOpen, setNotificationModalOpen] =
    useState<boolean>(false);

  const dropdownAnimation: MotionProps = useMemo(
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
    <>
      {!user && isAuthModalOpen && (
        <AuthenticationModal
          onSubmit={() => setAuthModalOpen(false)}
          onClose={() => setAuthModalOpen(false)}
        />
      )}

      <nav className="relative bg-grey-800">
        <div className="flex items-center gap-2 p-4">
          <Link className="flex items-center gap-2 select-none" href="/">
            <BsHouse
              className="text-movieHouse-dark"
              size={22}
              strokeWidth={1}
            />

            <h1 className="text-grey-100 font-mono font-semibold text-2xl">
              MovieHouse
            </h1>
          </Link>

          <div className="flex items-center ml-auto text-grey-300">
            {!user ? (
              <button
                className="p-2"
                type="button"
                onClick={() => setAuthModalOpen(prev => !prev)}
              >
                <FaUserAlt size={18} />
              </button>
            ) : (
              <button
                className="p-2"
                type="button"
                onClick={() => setNotificationModalOpen(prev => !prev)}
              >
                <BsFillBellFill size={18} />
              </button>
            )}

            <button
              type="button"
              className="p-2"
              onClick={() => setSearchBarOpen(prev => !prev)}
            >
              <FaSearch size={18} />
            </button>

            <button
              className="p-2"
              type="button"
              onClick={() => setMenuOpen(prev => !prev)}
            >
              {!isMenuOpen ? <HiMenu size={26} /> : <FiX size={26} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {user && isNotificationModalOpen && (
            <NotificationsModal animation={dropdownAnimation} />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isMenuOpen && <NavigationMenu animation={dropdownAnimation} />}
        </AnimatePresence>

        {isSearchBarOpen && <SearchBar />}
      </nav>
    </>
  );
};

export default Navbar;
