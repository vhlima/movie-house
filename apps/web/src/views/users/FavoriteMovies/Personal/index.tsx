import { useState } from 'react';

import { useAuth } from '../../../../hooks/useAuth';

import EditFavoriteMoviesModal from './components/EditModal';

import FavoriteMoviesList from '../List';

interface FavoriteMoviesPersonalProps {
  maxFavorite: number;
}

const FavoriteMoviesPersonal: React.FC<FavoriteMoviesPersonalProps> = ({
  maxFavorite,
}) => {
  const { user } = useAuth();

  const [isEdit, setEdit] = useState<boolean>(false);

  return (
    <>
      {isEdit && (
        <EditFavoriteMoviesModal
          maxFavorite={maxFavorite}
          onClose={() => setEdit(false)}
        />
      )}

      <FavoriteMoviesList
        isOwnProfile
        user={user}
        maxFavorite={maxFavorite}
        onClickEdit={() => setEdit(true)}
      />
    </>
  );
};

export default FavoriteMoviesPersonal;
