import { SortDropdown } from '../SortDropdown';

interface Props {
  pathname: string;
}

export const GenreDropdown: React.FC<Props> = ({ pathname }) => {
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
    <SortDropdown
      items={movieGenres}
      queryKey="genre"
      pathname={{
        clean: pathname,
        sort: `${pathname}/genre/[genre]`,
      }}
    />
  );
};
