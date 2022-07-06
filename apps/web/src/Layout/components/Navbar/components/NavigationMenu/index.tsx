import React from 'react';

import { useAuth } from '../../../../../hooks/useAuth';

import MenuItem from './components/MenuItem';

import Dropdown, { DropdownProps } from '../Dropdown';

const NavigationMenu: React.FC<DropdownProps> = ({ onClose }) => {
  const { user, signOut } = useAuth();

  return (
    <Dropdown onClose={onClose}>
      <ul className="p-4">
        {user && (
          <MenuItem
            itemProps={{
              href: {
                pathname: '/users/[id]',
                query: { id: user._id },
              },
            }}
            text="My Profile"
            icon="FaRegUserCircle"
          />
        )}

        <MenuItem
          itemProps={{ href: '/' }}
          text="Films"
          icon="BsFillCollectionFill"
        />

        <MenuItem itemProps={{ href: '/' }} text="Lists" icon="FaListUl" />

        <MenuItem itemProps={{ href: '/' }} text="Members" icon="FaUsers" />

        <MenuItem
          itemProps={{ href: '/' }}
          text="Journal"
          icon="IoIosJournal"
        />

        {user && (
          <MenuItem itemProps={{ onClick: signOut }} text="Logout" icon="FiX" />
        )}
      </ul>
    </Dropdown>
  );
};

export default NavigationMenu;
