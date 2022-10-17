import { useState } from 'react';

import { useFindUserFavoriteMoviesQuery } from '../../../../../graphql';

import { useAuth } from '../../../../../hooks/useAuth';

import { useProfile } from '../../hooks/useProfile';

import QueryState from '../../../../../components/QueryState';

import MovieCover from '../../../../movies/components/Cover';

import Card from '../../../../../components/Card';

import Link from '../../../../../components/Link';

import EditFavoriteMoviesModal from './components/EditFavoriteModal';

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
        <EditFavoriteMoviesModal onClose={() => setEditing(false)} />
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
        <QueryState loading={loading} error={error}>
          {data && (
            <ul className="flex gap-2">
              {data.userFavoriteMovies.map(({ movie }) => (
                <li key={`favorite-movies-profile-${movie.id}`}>
                  <Link
                    href={{
                      pathname: '/movies/[id]',
                      query: { id: movie.id },
                    }}
                  >
                    <MovieCover coverUrl={movie.posterUrl} />
                  </Link>
                </li>
              ))}

              {Array.from({ length: 4 - data.userFavoriteMovies.length }).map(
                n => (
                  <li key={`movie-cover-empty-${n}`}>
                    <MovieCover />
                  </li>
                ),
              )}
            </ul>
          )}
        </QueryState>
      </Card>
    </>
  );
};

export default FavoriteMovies;
