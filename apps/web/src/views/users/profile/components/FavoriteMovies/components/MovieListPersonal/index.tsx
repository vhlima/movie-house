import { useState } from 'react';

import type { FavoriteMovieData } from '../../../../../../../graphql/FavoriteMovie/types';

import EditFavoriteMoviesModal from './components/EditModal';

import MovieList from '../MovieList';
import AddFavoriteMovieModal from './components/AddModal';

interface MovieListPersonalProps {
  favoriteMovies: FavoriteMovieData[];
}

const MovieListPersonal: React.FC<MovieListPersonalProps> = ({
  favoriteMovies,
}) => {
  const [isEdit, setEdit] = useState<boolean>(false);

  const [isAdding, setAdding] = useState<boolean>(false);

  return (
    <>
      {isEdit &&
        (isAdding ? (
          <AddFavoriteMovieModal onClose={() => setAdding(false)} />
        ) : (
          <EditFavoriteMoviesModal
            favoriteMovies={favoriteMovies}
            onClickAdd={() => setAdding(true)}
            onClose={() => setEdit(false)}
          />
        ))}

      <MovieList
        favoriteMovies={favoriteMovies}
        rightIcon={{ iconType: 'FaPencilAlt', onClick: () => setEdit(true) }}
      />
    </>
  );
};

export default MovieListPersonal;
