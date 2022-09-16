import { useState } from 'react';

import { useFindUserFavoriteMoviesQuery } from '../../../../../graphql';

import { useAuth } from '../../../../../hooks/useAuth';

import { useProfile } from '../../hooks/useProfile';

import MovieCardList from '../MovieCardList';

import Card from '../../../../../components/Card';

import ErrorText from '../../../../../components/ErrorText';

import LoadingSpinner from '../../../../../components/LoadingSpinner';

import EditFavoriteMoviesModal from './components/EditFavoriteModal';

/* Max number of movies a user can have as favorite */
const MAX_FAVORITE_MOVIES = 4;

const FavoriteMovies: React.FC = () => {
  const { user: currentUser } = useAuth();

  const { user } = useProfile();

  /* When set to true, edit modal will be shown */
  const [isEditing, setEditing] = useState<boolean>(false);

  /* Fetch user's favorite movies */
  const { data, loading, error } = useFindUserFavoriteMoviesQuery({
    variables: { userId: user.id },
  });

  return (
    <>
      {isEditing && (
        <EditFavoriteMoviesModal
          favoriteMovies={[]}
          // favoriteMovies={data?.favoriteMovies || []}
          onClose={() => setEditing(false)}
        />
      )}

      <Card
        title="Favorite movies"
        rightIcon={
          currentUser &&
          currentUser.id === user.id && {
            iconType: 'FaPencilAlt',
            onClick: () => setEditing(true),
          }
        }
        noPadding
      >
        {error || loading ? (
          <>
            {loading && <LoadingSpinner center />}

            {error && <ErrorText text="Error loading favorite movies" />}
          </>
        ) : (
          <MovieCardList
            movies={[]}
            // movies={(data?.favoriteMovies || []).map(
            //   favoriteMovie => favoriteMovie.movie,
            // )}
            maxMovies={MAX_FAVORITE_MOVIES}
          />
        )}
      </Card>
    </>
  );
};

export default FavoriteMovies;
