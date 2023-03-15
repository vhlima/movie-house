import { useState } from 'react';

import { useAuth } from '@/hooks/useAuth';

import { PreMadeListType, useFindPreMadeListMoviesQuery } from '@/graphql';
import { useProfile } from '@/views/users/hooks/useProfile';

import Card from '../../../../../components/Card';

import MovieCoverList from '../../../../../components/movie/MovieCoverList';

import EditFavoriteMoviesModal from './components/EditFavoriteModal';
import PencilButton from '../PencilButton';

const FavoriteMovies: React.FC = () => {
  const { data: session } = useAuth();

  const { user } = useProfile();

  const [isEditing, setEditing] = useState<boolean>(false);

  const { data: listMoviesData } = useFindPreMadeListMoviesQuery({
    variables: { userId: user.id, listType: PreMadeListType.Favorite, page: 1 },
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
          {listMoviesData && listMoviesData && (
            <MovieCoverList
              className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-1 sm:gap-2"
              name="favorite-movie-profile"
              empty={
                listMoviesData.preMadeListMovies.itemsPerPage -
                listMoviesData.preMadeListMovies.totalCount
              }
              movies={listMoviesData.preMadeListMovies.edges.map(
                edge => edge.node,
              )}
            />
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default FavoriteMovies;
