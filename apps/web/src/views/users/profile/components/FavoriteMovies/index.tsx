import { useState } from 'react';

import { PreMadeListType, useFindPreMadeListMoviesQuery } from '@/gql';

import { useProfile } from '@/views/users/hooks/useProfile';

import { Card } from '@/components';

import { MovieCoverList2 as MovieCoverList } from '@/components/movie';

import EditFavoriteMoviesModal from './components/EditFavoriteModal';
import PencilButton from '../PencilButton';

export const FavoriteMovies: React.FC = () => {
  const { user } = useProfile();

  const [isEditing, setEditing] = useState<boolean>(false);

  const { data: listMoviesData } = useFindPreMadeListMoviesQuery({
    variables: { userId: user.id, listType: PreMadeListType.Favorite, page: 1 },
  });

  const { edges, itemsPerPage, totalCount } =
    listMoviesData?.preMadeListMovies || {};

  return (
    <>
      {isEditing && (
        <EditFavoriteMoviesModal onClose={() => setEditing(false)} />
      )}

      <Card>
        <Card.Header title="Favorite movies" marginBottom>
          <PencilButton onClick={() => setEditing(true)} />
        </Card.Header>

        <Card.Body>
          {listMoviesData && listMoviesData && (
            <MovieCoverList
              className="grid-cols-4"
              name="favorite-movie-profile"
              empty={itemsPerPage - totalCount}
              movies={edges.map(edge => edge.node)}
            />
          )}
        </Card.Body>
      </Card>
    </>
  );
};
