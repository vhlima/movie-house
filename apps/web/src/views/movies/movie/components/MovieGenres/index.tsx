import type { MovieGenre } from '@/gql';

import { MovieGenre as Genre } from './components';

interface Props {
  genres: MovieGenre[];
}

export const MovieGenres: React.FC<Props> = props => {
  const { genres } = props;

  return (
    <ul className="flex gap-2 flex-wrap" data-testid="movie-genre-list">
      {genres.map(genre => (
        <Genre key={`move-genre-${genre.id}`} name={genre.name} />
      ))}
    </ul>
  );
};
