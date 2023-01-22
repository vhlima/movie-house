import { useLogic } from './logic';

import QueryState from '../../../../components/QueryState';

import MovieCover from '../../../../components/movie/MovieCover';

interface MoviesSectionProps {
  listId: string;
}

const MoviesSection: React.FC<MoviesSectionProps> = ({ listId }) => {
  const { listMoviesResult } = useLogic({ listId });

  const { data, loading, error } = listMoviesResult;

  if (!data) {
    return <QueryState loading={loading} error={error} />;
  }

  return (
    <ul className="grid gap-2 my-4 grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10">
      {data.userListMovies.map(({ movie }) => (
        <MovieCover key={`list-movie-${movie.id}`} movie={movie} listItem />
      ))}
    </ul>
  );
};

export default MoviesSection;
