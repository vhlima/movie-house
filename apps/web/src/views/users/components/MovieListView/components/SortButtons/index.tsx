import { useState } from 'react';

import { useRouter } from 'next/router';

import GenreList from '../GenreList';
import DecadeList from '../DecadeList';

import SortButton from '../../../SortButton';

const SortButtons: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState<string>('');

  const { asPath } = useRouter();

  const rootPath = asPath.split('/')[3];

  return (
    <div className="flex gap-4 ml-auto">
      <SortButton
        text="Genre"
        isOpen={dropdownOpen === 'genre'}
        onClick={() =>
          setDropdownOpen(prev => (prev !== 'genre' ? 'genre' : ''))
        }
      >
        <GenreList pathname={rootPath} />
      </SortButton>

      <SortButton
        text="Decade"
        isOpen={dropdownOpen === 'decade'}
        onClick={() =>
          setDropdownOpen(prev => (prev !== 'decade' ? 'decade' : ''))
        }
      >
        <DecadeList pathname={rootPath} />
      </SortButton>
    </div>
  );
};

export default SortButtons;
