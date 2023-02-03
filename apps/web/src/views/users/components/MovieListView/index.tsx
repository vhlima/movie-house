import type { PropsWithChildren } from 'react';

import type {
  FindUserQuery,
  FindUserPreMadeListMoviesQuery,
} from '../../../../graphql';

import Typography from '../../../../components/Typography';

import MovieCoverList from '../../../../components/movie/MovieCoverList';

import UserProfileHeader from '../UserProfileHeader';

import SortButtons from './components/SortButtons';

interface MovieListViewProps {
  user: FindUserQuery['user'];
  movies: FindUserPreMadeListMoviesQuery['userPreMadeListMovies'];
}

const MovieListView: React.FC<PropsWithChildren<MovieListViewProps>> = ({
  user,
  movies,
  children,
}) => {
  const a = 1;

  return (
    <UserProfileHeader user={user}>
      <div className="flex items-center gap-2 border-b border-b-grey-800">
        <Typography className="uppercase" component="h1" size="sm">
          {user.username} watched {movies.length}{' '}
          {movies.length === 1 ? 'movie' : 'movies'}
        </Typography>

        <SortButtons />
      </div>

      {children}

      {!movies || movies.length === 0 ? (
        <Typography className="text-center" component="h1">
          No movies added yet.
        </Typography>
      ) : (
        <MovieCoverList name="user-profile-film-list" movies={movies} />
      )}
    </UserProfileHeader>
  );
};

export default MovieListView;
