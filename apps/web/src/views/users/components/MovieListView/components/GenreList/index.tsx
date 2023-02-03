import { useFindMovieGenresQuery } from '../../../../../../graphql';

import SortDropdown from '../SortDropdown';

interface GenreListProps {
  pathname: string;
}

const GenreList: React.FC<GenreListProps> = ({ pathname }) => {
  const { data, loading } = useFindMovieGenresQuery();

  const movieGenres = [
    { id: '-1', name: 'Any genre' },
    ...(data
      ? data.movieGenres.map(genre => ({ ...genre, id: `${genre.id}` }))
      : []),
  ];

  if (loading) {
    return null;
  }

  return (
    <SortDropdown
      items={movieGenres}
      queryKey="genre"
      pathname={{
        clean: `/users/[username]/${pathname}`,
        sort: `/users/[username]/${pathname}/genre/[genre]`,
      }}
    />
  );
};

export default GenreList;
