import { useState } from 'react';

import { useAuth } from '../../../../../hooks/useAuth';

import { useProfile } from '../../hooks/useProfile';

import {
  LimitType,
  PreMadeListType,
  useFindLimitQuery,
  useFindUserPreMadeListMoviesQuery,
} from '../../../../../graphql';

import Card from '../../../../../components/Card';

import EditFavoriteMoviesModal from './components/EditFavoriteModal';

import MovieCoverList from '../../../../../components/movie/MovieCoverList';

const FavoriteMovies: React.FC = () => {
  const { data: session } = useAuth();

  const { user } = useProfile();

  /* When set to true, edit modal will be shown */
  const [isEditing, setEditing] = useState<boolean>(false);

  /* Fetch user's favorite movies */
  const { data: listMoviesData } = useFindUserPreMadeListMoviesQuery({
    variables: { userId: user.id, listType: PreMadeListType.Favorite },
  });

  /* Fetch limit for favorite movies */
  const { data: limitData } = useFindLimitQuery({
    variables: { limitType: LimitType.MaxFavoriteMovies },
  });

  /* Used to display Pencil icon on card */
  const isSameUserAsProfile = session && session.user.id === user?.id;

  return (
    <>
      {isEditing && (
        <EditFavoriteMoviesModal onClose={() => setEditing(false)} />
      )}

      <Card
        title="Favorite movies"
        rightIcon={
          isSameUserAsProfile && {
            iconType: 'FaPencilAlt',
            onClick: () => setEditing(true),
          }
        }
        noPadding
      >
        {limitData && listMoviesData && (
          <MovieCoverList
            className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-1 sm:gap-2"
            name="favorite-movie-profile"
            empty={
              limitData.limit.limit -
              listMoviesData.userPreMadeListMovies.length
            }
            movies={listMoviesData.userPreMadeListMovies.map(
              ({ movie }) => movie,
            )}
          />
        )}
      </Card>
    </>
  );
};

export default FavoriteMovies;
