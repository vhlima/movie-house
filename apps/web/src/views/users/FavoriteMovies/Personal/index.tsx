import { useState } from 'react';

import { useAuth } from '../../../../hooks/useAuth';

import AddFavoriteMovieModal from './components/AddModal';

import EditFavoriteMoviesModal from './components/EditModal';

import FavoriteMoviesBase from '../Base';

interface FavoriteMoviesPersonalProps {
  maxFavorite: number;
}

const FavoriteMoviesPersonal: React.FC<FavoriteMoviesPersonalProps> = ({
  maxFavorite,
}) => {
  const { user } = useAuth();

  const [isAddingFavoriteMovie, setAddingFavoriteMovie] =
    useState<boolean>(false);

  const [isEdit, setEdit] = useState<boolean>(false);

  return (
    <>
      {isAddingFavoriteMovie && (
        <AddFavoriteMovieModal onClose={() => setAddingFavoriteMovie(false)} />
      )}

      {isEdit && <EditFavoriteMoviesModal onClose={() => setEdit(false)} />}

      <FavoriteMoviesBase
        isOwnProfile
        user={user}
        maxFavorite={maxFavorite}
        onClickEdit={() => setEdit(true)}
      />
    </>
  );
};

export default FavoriteMoviesPersonal;
