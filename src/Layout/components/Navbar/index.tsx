import React, { useState } from 'react';

import { FaSearch, FaUserAlt } from 'react-icons/fa';

import { BsHouse } from 'react-icons/bs';

import { FiX } from 'react-icons/fi';

import { HiMenu } from 'react-icons/hi';

import Link from '../../../components/Link';

import NavigationMenu from './components/NavigationMenu';
import SearchBar from './components/SearchBar';

const Navbar: React.FC = () => {
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
  const [isSearchBarOpen, setSearchBarOpen] = useState<boolean>(false);

  const isLogged = false;

  return (
    <div className="relative bg-complementary text-primary">
      <div className="flex items-center gap-2 p-4">
        <Link className="flex items-center gap-2 select-none" href="/">
          <BsHouse size={22} strokeWidth={1} />

          <h1 className="font-mono font-semibold text-2xl">MovieHouse</h1>
        </Link>

        <div className="flex items-center ml-auto text-secondaryVariant">
          {!isLogged && (
            <button type="button" className="p-2">
              <FaUserAlt size={18} />
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

      {isMenuOpen && <NavigationMenu />}

      {isSearchBarOpen && <SearchBar />}
    </div>
  );
};

export default Navbar;
