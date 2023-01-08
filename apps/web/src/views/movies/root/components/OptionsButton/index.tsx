import { useState } from 'react';

import { useMovie } from '../../hooks/useMovie';

import Button from '../../../../../components/Button';

import MovieActionsModal from '../../../../../components/movie/MovieActionsModal';

const OptionsButton: React.FC = () => {
  const { movie } = useMovie();

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

export default OptionsButton;
