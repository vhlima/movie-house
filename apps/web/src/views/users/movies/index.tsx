import type { PropsWithChildren } from 'react';

import type {
  FindUserQuery,
  FindPreMadeListMoviesQuery,
} from '../../../graphql';

import Typography from '../../../components/Typography';

import MovieCoverList from '../../../components/movie/MovieCoverList';

import UserProfilePageView from '../components/UserProfilePageView';

import SortButtons from './components/SortButtons';

interface UserMovieListViewProps {
  user: FindUserQuery['user'];
  movies: FindPreMadeListMoviesQuery['preMadeListMovies'];
}

const UserMovieListView: React.FC<
  PropsWithChildren<UserMovieListViewProps>
> = ({ user, movies, children }) => (
  <UserProfilePageView
    user={user}
    title={`${user.username} watched ${movies.totalCount} ${
      movies.totalCount === 1 ? 'movie' : 'movies'
    }`}
    sortButtons={<SortButtons />}
  >
    {children}

    {!movies || movies.totalCount === 0 ? (
      <Typography component="h1">No movies added yet.</Typography>
    ) : (
      <MovieCoverList
        name="user-profile-film-list"
        movies={movies.edges.map(({ node }) => node)}
      />
    )}
  </UserProfilePageView>
);

export default UserMovieListView;
