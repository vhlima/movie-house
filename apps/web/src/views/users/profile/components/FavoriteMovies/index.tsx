import { useState } from 'react';

import { useAuth } from '../../../../../hooks/useAuth';

import { useProfile } from '../../hooks/useProfile';

import { useFindUserFavoriteMoviesQuery } from '../../../../../graphql';

import MovieCover from '../../../../movies/components/Cover';

import Card from '../../../../../components/Card';

import Link from '../../../../../components/Link';

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
        <ul className="flex gap-2">
          {data &&
            data.userFavoriteMovies.map(({ movie }) => (
              <li
                className="flex flex-col gap-2 flex-grow sm:flex-grow-0"
                key={`favorite-movies-profile-${movie.id}`}
              >
                <Link
                  href={{
                    pathname: '/movies/[id]',
                    query: { id: movie.id },
                  }}
                >
                  <MovieCover coverUrl={movie.posterUrl} coverSize="auto" />
                </Link>
              </li>
            ))}

          {Array.from({
            length: 4 - (!data ? 0 : data.userFavoriteMovies.length),
          })
            .map((_, index) => index + 1)
            .map(n => (
              <li
                className="flex-grow sm:flex-grow-0"
                key={`movie-cover-empty-${n}`}
              >
                <MovieCover coverSize="auto" />
              </li>
            ))}
        </ul>
      </Card>
    </>
  );
};

export default FavoriteMovies;
