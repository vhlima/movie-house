import type { DropdownProps } from '../Dropdown';

import { useAuth, signOut } from '../../../../../hooks/useAuth';

import MenuItem from './components/MenuItem';

import Dropdown from '../Dropdown';

const NavigationMenu: React.FC<DropdownProps> = ({ onClose }) => {
  const { data } = useAuth();

  return (
    <Dropdown onClose={onClose}>
      <ul className="">
        {data && (
          <MenuItem
            itemProps={{
              href: {
                pathname: '/users/[username]',
                query: { username: data.user.username },
              },
            }}
            text="My Profile"
            icon="FaRegUserCircle"
          />
        )}

        <MenuItem
          itemProps={{ href: '/movies/trending' }}
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

        {data && (
          <MenuItem itemProps={{ onClick: signOut }} text="Logout" icon="FiX" />
        )}
      </ul>
    </Dropdown>
  );
};

export default NavigationMenu;
