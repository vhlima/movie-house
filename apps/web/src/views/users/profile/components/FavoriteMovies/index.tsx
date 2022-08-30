import { useMemo } from 'react';

import { useQuery } from '@apollo/client';

import {
  FavoriteMovieData,
  FindFavoriteMoviesInput,
  FindFavoriteMoviesResponse,
} from '../../../../../graphql/FavoriteMovie/types';

import { FIND_FAVORITE_MOVIES } from '../../../../../graphql/FavoriteMovie';

import { useAuth } from '../../../../../hooks/useAuth';

import { useProfile } from '../../hooks/useProfile';

import MovieList from './components/MovieList';

import MovieListPersonal from './components/MovieListPersonal';
import LoadingSpinner from '../../../../../components/LoadingSpinner';
import ErrorText from '../../../../../components/ErrorText';

/* Max number of movies a user can have as favorite */
const MAX_FAVORITE_MOVIES = 4;

const FavoriteMovies: React.FC = () => {
  const { user } = useAuth();

  const { user: currentUser } = useProfile();

  /* Fetch currentUser favorite movies */
  const { data, loading, error } = useQuery<
    FindFavoriteMoviesResponse,
    FindFavoriteMoviesInput
  >(FIND_FAVORITE_MOVIES, { variables: { userId: currentUser.id } });

  /* 
    Insert on empty array slots an undefined object.
    We use this to specify how many covers we will show at the interface.
  */
  const favoriteMovies = useMemo<Array<FavoriteMovieData | undefined>>(() => {
    const favoriteMoviesCopy = data ? [...data.favoriteMovies] : [];

    if (favoriteMoviesCopy.length < MAX_FAVORITE_MOVIES) {
      for (let i = favoriteMoviesCopy.length; i < MAX_FAVORITE_MOVIES; i += 1) {
        favoriteMoviesCopy.push(undefined);
      }
    }

    return favoriteMoviesCopy;
  }, [data]);

  if (error) {
    return <ErrorText text="Error loading favorite movies" />;
  }

  if (loading) {
    return (
      <MovieList favoriteMovies={[]}>
        <LoadingSpinner center />
      </MovieList>
    );
  }

  const isOwnProfile = user && user.id === currentUser.id;

  return !isOwnProfile ? (
    <MovieList favoriteMovies={favoriteMovies} />
  ) : (
    <MovieListPersonal favoriteMovies={favoriteMovies} />
  );
};

export default FavoriteMovies;
