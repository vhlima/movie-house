import { useState } from 'react';

import { useRouter } from 'next/router';

import GenreList from '../../../../../components/Sort/GenreList';
import DecadeList from '../../../../../components/Sort/DecadeList';
import SortButton from '../../../../../components/Sort/SortButton';

const SortButtons: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState<string>('');

  const { asPath } = useRouter();

  const rootPath = asPath.split('/').slice(0, 4).join('/');

  return (
    <div className="flex flex-col sm:flex-row items-center ml-auto">
      <SortButton
        text="Genre"
        sizeType="lg"
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
