import { useState } from 'react';

import { useAuth } from '../../../../../../../hooks/useAuth';

import EditFavoriteMoviesModal from './components/EditModal';

import MovieList from '../MovieList';

interface MovieListPersonalProps {
  maxFavorite: number;
}

const MovieListPersonal: React.FC<MovieListPersonalProps> = ({
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

      <MovieList
        user={user}
        maxFavorite={maxFavorite}
        rightIcon={{ iconType: 'FaPencilAlt', onClick: () => setEdit(true) }}
      />
    </>
  );
};

export default MovieListPersonal;
