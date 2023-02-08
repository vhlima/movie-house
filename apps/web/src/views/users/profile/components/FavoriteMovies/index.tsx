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

import MovieCoverList from '../../../../../components/movie/MovieCoverList';

import EditFavoriteMoviesModal from './components/EditFavoriteModal';
import PencilButton from '../PencilButton';

const FavoriteMovies: React.FC = () => {
  const { data: session } = useAuth();

  const { user } = useProfile();

  const [isEditing, setEditing] = useState<boolean>(false);

  const { data: listMoviesData } = useFindUserPreMadeListMoviesQuery({
    variables: { userId: user.id, listType: PreMadeListType.Favorite },
  });

  const { data: limitData } = useFindLimitQuery({
    variables: { limitType: LimitType.MaxFavoriteMovies },
  });

  const isSameUserAsSession = session && session.user.id === user?.id;

  return (
    <>
      {isEditing && (
        <EditFavoriteMoviesModal onClose={() => setEditing(false)} />
      )}

      <Card>
        <Card.Header title="Favorite movies" marginBottom>
          {isSameUserAsSession && (
            <PencilButton onClick={() => setEditing(true)} />
          )}
        </Card.Header>

        <Card.Body>
          {limitData && listMoviesData && (
            <MovieCoverList
              className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-1 sm:gap-2"
              name="favorite-movie-profile"
              empty={
                limitData.limit.limit -
                listMoviesData.userPreMadeListMovies.length
              }
              movies={listMoviesData.userPreMadeListMovies}
            />
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default FavoriteMovies;
