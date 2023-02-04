import type { PropsWithChildren } from 'react';

import type {
  FindUserQuery,
  FindUserPreMadeListMoviesQuery,
} from '../../../../graphql';

import Typography from '../../../../components/Typography';
import MovieCoverList from '../../../../components/movie/MovieCoverList';

import UserProfilePageView from '../UserProfilePageView';

import SortButtons from './components/SortButtons';
import YearNavigation from './components/YearNavigation';

interface MovieListViewProps {
  user: FindUserQuery['user'];
  movies: FindUserPreMadeListMoviesQuery['userPreMadeListMovies'];

  navigation?: {
    year: number;
    isDecade?: boolean;
  };
}

const MovieListView: React.FC<PropsWithChildren<MovieListViewProps>> = ({
  user,
  movies,
  navigation,
  children,
}) => (
  <UserProfilePageView
    title={`${user.username} watched ${movies.length} ${
      movies.length === 1 ? 'movie' : 'movies'
    }`}
    user={user}
    sortButtons={<SortButtons />}
  >
    {navigation && (
      <YearNavigation year={navigation.year} isDecade={navigation.isDecade} />
    )}

    {children}

    {!movies || movies.length === 0 ? (
      <Typography className="text-center" component="h1">
        No movies added yet.
      </Typography>
    ) : (
      <MovieCoverList name="user-profile-film-list" movies={movies} />
    )}
  </UserProfilePageView>

  // <UserProfileHeader user={user}>
  //   <UserProfileSubNavigation
  //     title={`${user.username} watched ${movies.length} ${
  //       movies.length === 1 ? 'movie' : 'movies'
  //     }`}
  //   >
  //     <SortButtons />
  //   </UserProfileSubNavigation>

  //   {children}

  //   {!movies || movies.length === 0 ? (
  //     <Typography className="text-center" component="h1">
  //       No movies added yet.
  //     </Typography>
  //   ) : (
  //     <MovieCoverList name="user-profile-film-list" movies={movies} />
  //   )}
  // </UserProfileHeader>
);

export default MovieListView;
