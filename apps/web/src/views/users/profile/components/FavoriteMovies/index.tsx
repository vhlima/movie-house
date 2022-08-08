import { useAuth } from '../../../../../hooks/useAuth';

import { useProfile } from '../../hooks/useProfile';

import MovieList from './components/MovieList';

import MovieListPersonal from './components/MovieListPersonal';

const MAX_FAVORITE_MOVIES = 4;

const FavoriteMovies: React.FC = () => {
  const { user: currentUser } = useAuth();

  const { user } = useProfile();

  const isOwnProfile = currentUser && currentUser._id === user._id;

  return !isOwnProfile ? (
    <MovieList user={user} maxFavorite={MAX_FAVORITE_MOVIES} />
  ) : (
    <MovieListPersonal maxFavorite={MAX_FAVORITE_MOVIES} />
  );
};

export default FavoriteMovies;
