import { useState } from 'react';

import { useMovie } from '../../hooks/useMovie';

import Button from '../../../../../components/Button';

import MovieOptionsModal from '../../../components/OptionsModal';

const OptionsButton: React.FC = () => {
  const { movie } = useMovie();

  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <>
      {isOpen && (
        <MovieOptionsModal movie={movie} onClose={() => setOpen(false)} />
      )}

      <Button buttonStyle="secondary" onClick={() => setOpen(true)}>
        Rate this movie
      </Button>
    </>
  );
};

export default OptionsButton;
