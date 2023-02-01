import { useState } from 'react';

import MovieListSortButton from '../../../components/MovieListSortButton';

import MovieGenreList from './components/MovieGenreList';

const MovieListSortButtons: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState<string>('');

  return (
    <div className="ml-auto">
      <MovieListSortButton
        text="Genre"
        isOpen={dropdownOpen === 'genre'}
        onClick={() =>
          setDropdownOpen(prev => (prev !== 'genre' ? 'genre' : ''))
        }
      >
        <MovieGenreList />
      </MovieListSortButton>
    </div>
  );
};

export default MovieListSortButtons;
