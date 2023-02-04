import { useState } from 'react';

import SortButton from '../../../components/SortButton';
import SortDropdown from '../../../components/SortDropdown';

const SortButtons: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState<string>('');

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

  return (
    <SortButton
      text="Sort by"
      isOpen={dropdownOpen === 'year'}
      onClick={() => setDropdownOpen(prev => (prev !== 'year' ? 'year' : ''))}
    >
      <SortDropdown
        singleOption
        items={dropdownItems}
        queryKey="sortType"
        pathname={{
          clean: `/users/[username]/lists`,
          sort: `/users/[username]/lists/by/[sortType]`,
        }}
      />
    </SortButton>
  );
};

export default SortButtons;
