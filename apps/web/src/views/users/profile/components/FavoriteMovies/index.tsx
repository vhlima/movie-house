import { useState } from 'react';

import { useAuth } from '../../../../../hooks/useAuth';

import { useProfile } from '../../hooks/useProfile';

import type { UserListPreMadeMovie } from '../../../../../graphql';

import { useFindUserFavoriteMoviesQuery } from '../../../../../graphql';

import MovieCover from '../../../../../components/movie/MovieCover';

import Card from '../../../../../components/Card';

import EditFavoriteMoviesModal from './components/EditFavoriteModal';

const FavoriteMovies: React.FC = () => {
  const { data: session } = useAuth();

  const { user } = useProfile();

  /* When set to true, edit modal will be shown */
  const [isEditing, setEditing] = useState<boolean>(false);

  /* Fetch user's favorite movies */
  const { data } = useFindUserFavoriteMoviesQuery({
    variables: { userId: user?.id },
  });

  const favoriteMoviesFromQuery = data?.userFavoriteMovies || [];

  const favoriteMovies = [
    ...favoriteMoviesFromQuery,
    ...Array.from({
      length: 4 - favoriteMoviesFromQuery.length,
    }).map(() => null),
  ] as Array<UserListPreMadeMovie | null>;

  const { user: currentUser } = session || {};

  return (
    <>
      {isEditing && (
        <EditFavoriteMoviesModal onClose={() => setEditing(false)} />
      )}

      <Card
        title="Favorite movies"
        rightIcon={
          currentUser &&
          currentUser.id === user?.id && {
            iconType: 'FaPencilAlt',
            onClick: () => setEditing(true),
          }
        }
        noPadding
      >
        <ul className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-1 sm:gap-2 relative">
          {favoriteMovies.map((favoriteMovie, index) => (
            <MovieCover
              key={
                favoriteMovie
                  ? `favorite-movie-profile-${favoriteMovie.movie.id}`
                  : `favorite-movie-profile-null-${index}`
              }
              movie={favoriteMovie?.movie}
            />
          ))}
        </ul>
      </Card>
    </>
  );
};

export default FavoriteMovies;
