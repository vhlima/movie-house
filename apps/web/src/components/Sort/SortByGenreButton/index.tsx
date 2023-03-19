import { useSingleDropdown } from '@/hooks/useSingleDropdown';

import type { SortButtonIntent } from '../SortButton';

import SortButton from '../SortButton';

import SortDropdown from '../SortDropdown';

interface Props {
  intent?: SortButtonIntent;
  pathname: string;
}

export const SortByGenreButton: React.FC<Props> = ({ intent, pathname }) => {
  const { dropdownOpen, openDropdown, closeDropdown } = useSingleDropdown();

  const movieGenres = [
    'Any genre',
    'Action',
    'Adventure',
    'Animation',
    'Comedy',
    'Crime',
    'Documentary',
    'Drama',
    'Family',
    'Fantasy',
    'History',
    'Horror',
    'Music',
    'Mystery',
    'Romance',
    'Science Fiction',
    'TV Movie',
    'Thriller',
    'War',
    'Western',
  ].map((genre, index) => ({
    id: index === 0 ? '-1' : genre,
    name: genre,
  }));

  return (
    <SortButton
      text="Genre"
      intent={intent}
      isOpen={dropdownOpen === 'genre'}
      onClick={() => openDropdown('genre')}
      onClose={() => closeDropdown()}
    >
      <SortDropdown
        items={movieGenres}
        queryKey="genre"
        pathname={{
          clean: pathname,
          sort: `${pathname}/genre/[genre]`,
        }}
      />
    </SortButton>
  );
};
