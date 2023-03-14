import { useState } from 'react';

import { useRouter } from 'next/router';

import GenreList from '../../../../../components/Sort/GenreList';
import DecadeList from '../../../../../components/Sort/DecadeList';
import SortButton from '../../../../../components/Sort/SortButton';

type DropdownType = 'genre' | 'decade';

const SortButtons: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState<DropdownType>();

  const { asPath } = useRouter();

  const rootPath = asPath.split('/').slice(0, 4).join('/');

  function openDropdown(dropdown: DropdownType) {
    setDropdownOpen(prev => (prev !== dropdown ? dropdown : undefined));
  }

  function closeDropdown() {
    setDropdownOpen(undefined);
  }

  return (
    <div className="flex flex-col sm:flex-row items-center ml-auto">
      <SortButton
        text="Genre"
        sizeType="lg"
        isOpen={dropdownOpen === 'genre'}
        onClick={() => openDropdown('genre')}
        onClose={() => closeDropdown()}
      >
        <GenreList pathname={rootPath} />
      </SortButton>

      <SortButton
        text="Decade"
        isOpen={dropdownOpen === 'decade'}
        onClick={() => openDropdown('decade')}
        onClose={() => closeDropdown()}
      >
        <DecadeList pathname={rootPath} />
      </SortButton>
    </div>
  );
};

export default SortButtons;
