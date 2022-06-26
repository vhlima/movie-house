import React, { useState } from 'react';

import { FaSearch, FaUserAlt } from 'react-icons/fa';

import { BsHouse } from 'react-icons/bs';

import { FiX } from 'react-icons/fi';

import { HiMenu } from 'react-icons/hi';

import Link from '../../../components/Link';

import SearchBar from './components/SearchBar';
import NavigationMenu from './components/NavigationMenu';
import AuthenticationModal from './components/AuthenticationModal';

const Navbar: React.FC = () => {
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
  const [isSearchBarOpen, setSearchBarOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setAuthModalOpen] = useState<boolean>(false);

  const isLogged = false;

  return (
    <>
      {!isLogged && isAuthModalOpen && (
        <AuthenticationModal onSubmit={() => setAuthModalOpen(false)} />
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
            {!isLogged ? (
              <button
                type="button"
                className="p-2"
                onClick={() => setAuthModalOpen(prev => !prev)}
              >
                <FaUserAlt size={18} />
              </button>
            ) : (
              <Link href="/">
                <FaUserAlt size={18} />
              </Link>
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

        {isMenuOpen && <NavigationMenu />}

        {isSearchBarOpen && <SearchBar />}
      </nav>
    </>
  );
};

export default Navbar;
