import { useAuth, signOut } from '@/hooks/useAuth';
import type { DropdownProps } from '../../../Dropdown';

import MenuItem from './components/MenuItem';

import Dropdown from '../../../Dropdown';

const NavigationMenu: React.FC<DropdownProps> = ({ onClose }) => {
  const { data: session } = useAuth();

  return (
    <Dropdown onClose={onClose}>
      <ul className="">
        {session && (
          <MenuItem
            itemProps={{
              href: {
                pathname: '/users/[username]',
                query: { username: session.user.username },
              },
            }}
            text="My Profile"
            icon="FaRegUserCircle"
          />
        )}

        <MenuItem
          itemProps={{ href: '/movies' }}
          text="Films"
          icon="BsFillCollectionFill"
        />

        {session && (
          <MenuItem
            itemProps={{
              href: {
                pathname: '/users/[username]/lists',
                query: { username: session.user.username },
              },
            }}
            text="Lists"
            icon="FaListUl"
          />
        )}

        {/* <MenuItem itemProps={{ href: '/' }} text="Members" icon="FaUsers" /> */}

        {/* <MenuItem
          itemProps={{ href: '/' }}
          text="Journal"
          icon="IoIosJournal"
        /> */}

        {session && (
          <MenuItem itemProps={{ onClick: signOut }} text="Logout" icon="FiX" />
        )}
      </ul>
    </Dropdown>
  );
};

export default NavigationMenu;
