import React from 'react';

import { BsFillCollectionFill } from 'react-icons/bs';

import { FaListUl, FaUsers } from 'react-icons/fa';

import { IoIosJournal } from 'react-icons/io';

import MenuLink from './components/MenuLink';

const NavigationMenu: React.FC = () => (
  <div className="absolute w-full bg-inherit">
    <ul className="p-4">
      <MenuLink href="/" text="Films" icon={BsFillCollectionFill} />
      <MenuLink href="/" text="Lists" icon={FaListUl} />
      <MenuLink href="/" text="Members" icon={FaUsers} />
      <MenuLink href="/" text="Journal" icon={IoIosJournal} />
    </ul>
  </div>
);

export default NavigationMenu;
