import { useState } from 'react';

import { Button } from '@/components';

import { MovieActionsModal } from '@/components/movie';

interface Props {
  id: number;
  originalTitle: string;
}

export const MovieActionsButton: React.FC<Props> = props => {
  const { id, originalTitle } = props;

  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <>
      {isOpen && (
        <MovieActionsModal
          id={id}
          originalTitle={originalTitle}
          onClose={() => setOpen(false)}
        />
      )}

      <Button
        intent="secondary"
        onClick={() => setOpen(true)}
        data-testid="movie-actions-button"
      >
        Rate this movie
      </Button>
    </>
  );
};
