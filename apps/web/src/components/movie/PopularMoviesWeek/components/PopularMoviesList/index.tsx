import { Typography } from '@/components';

import { MovieCover } from '@/components/movie';

interface Props {
  movies: Array<{
    id: number;
    originalTitle: string;
    posterUrl: string;
  }>;
}

export const PopularMoviesList: React.FC<Props> = props => {
  const { movies } = props;

  const hasAnyMovie = movies ? movies.length > 0 : false;

  if (!hasAnyMovie) {
    return (
      <Typography component="h2" data-testid="empty-list-text">
        No movies were found.
      </Typography>
    );
  }

  return (
    <ul
      className="grid grid-cols-3 sm:grid-cols-6 gap-2"
      data-testid="popular-movies-list"
    >
      {movies.slice(0, 6).map(movie => (
        <li key={`movie-cover-${movie.id}`}>
          <MovieCover movie={movie} />
        </li>
      ))}
    </ul>
  );
};
