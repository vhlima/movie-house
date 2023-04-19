import { useState } from 'react';

import { Button } from '@/components';

import { MovieActionsModal } from '@/components/movie';

interface MovieOptionsButtonProps {
  movie: {
    id: number;
    originalTitle: string;
  };
}

export const MovieOptionsButton: React.FC<MovieOptionsButtonProps> = props => {
  const { movie } = props;

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

      <Button intent="secondary" onClick={() => setOpen(true)}>
        Rate this movie
      </Button>
    </>
  );
};
