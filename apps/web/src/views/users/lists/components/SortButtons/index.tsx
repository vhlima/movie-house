import { useState } from 'react';

import { useProfile } from '@/views/users/hooks/useProfile';

import SortButton from '../../../../../components/Sort/SortButton';
import SortDropdown from '../../../../../components/Sort/SortDropdown';

type DropdownType = 'newest' | 'popularity' | 'name' | 'older' | 'updated';

const dropdownItems = [
  {
    id: '-1',
    name: 'Newest',
  },
  {
    id: 'popularity',
    name: 'Popularity',
  },
  {
    id: 'name',
    name: 'Name',
  },
  {
    id: 'older',
    name: 'Older',
  },
  {
    id: 'updated',
    name: 'Last updated',
  },
];

const SortButtons: React.FC = () => {
  const { user } = useProfile();

  const [dropdownOpen, setDropdownOpen] = useState<DropdownType>();

  function openDropdown(dropdown: DropdownType) {
    setDropdownOpen(prev => (prev !== dropdown ? dropdown : undefined));
  }

  function closeDropdown() {
    setDropdownOpen(undefined);
  }

  return (
    <SortButton
      text="Sort by"
      intent="secondary"
      isOpen={dropdownOpen === 'newest'}
      onClick={() => openDropdown('newest')}
      onClose={() => closeDropdown()}
    >
      <SortDropdown
        singleOption
        items={dropdownItems}
        queryKey="sortType"
        pathname={{
          clean: {
            pathname: '/users/[username]/lists',
            query: {
              username: user.username,
            },
          },
          sort: {
            pathname: '/users/[username]/lists/by/[sortType]',
            query: {
              username: user.username,
            },
          },
        }}
      />
    </SortButton>
  );
};

export default SortButtons;
