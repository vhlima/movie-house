import type { UserResponse } from '../../../types/user';

import { useAuth } from '../../../hooks/useAuth';

import FavoriteMoviesBase from './Base';

import FavoriteMoviesPersonal from './Personal';

interface FavoriteMoviesProps {
  user: UserResponse;
}

const MAX_FAVORITE_MOVIES = 4;

const FavoriteMovies: React.FC<FavoriteMoviesProps> = ({ user }) => {
  const { user: currentUser } = useAuth();

  const isOwnProfile = currentUser && currentUser._id === user._id;

  return !isOwnProfile ? (
    <FavoriteMoviesBase user={user} maxFavorite={MAX_FAVORITE_MOVIES} />
  ) : (
    <FavoriteMoviesPersonal maxFavorite={MAX_FAVORITE_MOVIES} />
  );
};

export default FavoriteMovies;
