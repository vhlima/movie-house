import { useState } from 'react';

import type { Movie } from '../../../../../graphql';

import Button from '../../../../../components/Button';

import MovieActionsModal from '../../../../../components/movie/MovieActionsModal';

interface MovieOptionsButtonProps {
  movie: {
    id: Movie['id'];
    originalTitle: Movie['originalTitle'];
  };
}

const MovieOptionsButton: React.FC<MovieOptionsButtonProps> = ({ movie }) => {
  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <>
      {isOpen && (
        <MovieActionsModal
          movie={{
            id: movie.id,
            originalTitle: movie.originalTitle,
          }}
          onClose={() => setOpen(false)}
        />
      )}

      <Button buttonStyle="secondary" onClick={() => setOpen(true)}>
        Rate this movie
      </Button>
    </>
  );
};

export default MovieOptionsButton;