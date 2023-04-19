import { useState } from 'react';

import { Button } from '@/components';

import { MovieActionsModal } from '@/components/movie';

interface MovieActionsProps {
  movie: {
    id: number;
    originalTitle: string;
  };
}

export const MovieActionsButton: React.FC<MovieActionsProps> = props => {
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
