import type { PropsWithChildren } from 'react';

import type {
  FindUserQuery,
  FindUserPreMadeListMoviesQuery,
} from '../../../graphql';

import Typography from '../../../components/Typography';

import MovieCoverList from '../../../components/movie/MovieCoverList';

import UserProfilePageView from '../components/UserProfilePageView';

import SortButtons from './components/SortButtons';

interface UserMovieListViewProps {
  user: FindUserQuery['user'];
  movies: FindUserPreMadeListMoviesQuery['userPreMadeListMovies'];
}

const UserMovieListView: React.FC<
  PropsWithChildren<UserMovieListViewProps>
> = ({ user, movies, children }) => (
  <UserProfilePageView
    user={user}
    title={`${user.username} watched ${movies.length} ${
      movies.length === 1 ? 'movie' : 'movies'
    }`}
    sortButtons={<SortButtons />}
  >
    {children}

    {!movies || movies.length === 0 ? (
      <Typography className="text-center" component="h1">
        No movies added yet.
      </Typography>
    ) : (
      <MovieCoverList name="user-profile-film-list" movies={movies} />
    )}
  </UserProfilePageView>
);

export default UserMovieListView;
