import type { PropsWithChildren } from 'react';

import type { FindUserQuery, FindPreMadeListMoviesQuery } from '@/graphql';

import { Typography, Pagination } from '@/components';

import { MovieCoverList } from '@/components/movie';

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
      <>
        <div className="my-4">
          <MovieCoverList
            name="user-profile-film-list"
            movies={movies.edges.map(({ node }) => node)}
          />
        </div>

        <Pagination
          currentPage={movies.pageInfo.currentPage}
          totalPages={movies.totalPages}
        />
      </>
    )}
  </UserProfilePageView>
);

export default UserMovieListView;
