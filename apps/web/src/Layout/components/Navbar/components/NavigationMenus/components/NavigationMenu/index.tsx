import { useAuth, signOut } from '@/hooks/useAuth';

import type { DropdownProps } from '../../../Dropdown';

import MenuItem from './components/MenuItem';

import Dropdown from '../../../Dropdown';

const NavigationMenu: React.FC<DropdownProps> = ({ onClose }) => {
  const { data: session } = useAuth();

  return (
    <Dropdown tabIndex={-1} onClose={onClose}>
      <ul>
        {session && (
          <MenuItem
            href={{
              pathname: '/users/[username]',
              query: { username: session.user.username },
            }}
            text="My Profile"
            icon="FaRegUserCircle"
          />
        )}

        <MenuItem text="Films" icon="BsFillCollectionFill" href="/movies" />

        {session && (
          <MenuItem
            text="Lists"
            icon="FaListUl"
            href={{
              pathname: '/users/[username]/lists',
              query: { username: session.user.username },
            }}
          />
        )}

        {session && <MenuItem text="Logout" icon="FiX" onClick={signOut} />}
      </ul>
    </Dropdown>
  );
};

export default NavigationMenu;
