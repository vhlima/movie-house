import type { Movie } from '../../../../../graphql';

import Button from '../../../../../components/Button';

import SvgIcon from '../../../../../components/SvgIcon';

import MovieCover from '../../../../movies/components/Cover';

interface MovieCardsEditableProps {
  movies: Movie[];

  onAdd: () => void;
  onRemove: (movieId: number) => void;
}

const MovieCardsEditable: React.FC<MovieCardsEditableProps> = ({
  movies,
  onAdd,
  onRemove,
}) => {
  const a = 1;

  return (
    <ul className="grid grid-cols-4 gap-2">
      {movies.map(movie => (
        <li
          className="flex flex-col gap-2"
          key={`favorite-movies-modal-${movie.id}`}
        >
          <MovieCover coverUrl={movie.posterUrl} coverSize="full" />

          <Button
            buttonStyle="danger"
            buttonSize="xs"
            onClick={() => onRemove(movie.id)}
          >
            X
          </Button>
        </li>
      ))}

      {Array.from({ length: 4 - movies.length }).map((n, index) => (
        <li key={`movie-cover-empty-edit-${n}`}>
          <MovieCover
            coverStyle="secondary"
            coverSize="full"
            onClick={index === 0 ? onAdd : undefined}
          >
            {index === 0 && (
              <SvgIcon iconType="AiOutlinePlusCircle" size={30} />
            )}
          </MovieCover>
        </li>
      ))}
    </ul>
  );
};

export default MovieCardsEditable;
