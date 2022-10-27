import type { Movie } from '../../../../../graphql';

import Button from '../../../../../components/Button';

import SvgIcon from '../../../../../components/SvgIcon';

import MovieCover from '../../../../movies/components/Cover';

interface MovieCardsEditableProps {
  movies: Movie[];
  maxMovies: number;

  onAdd: () => void;
  onRemove: (movieId: number) => void;
}

const MovieCardsEditable: React.FC<MovieCardsEditableProps> = ({
  movies,
  maxMovies,
  onAdd,
  onRemove,
}) => {
  const movieList = [
    ...movies,
    ...Array.from({ length: maxMovies - movies.length }).map(() => undefined),
  ];

  const firstEmptyIndex = movieList.findIndex(m => !m);

  return (
    <ul className="flex gap-2">
      {movieList.map((movie, index) => (
        <li
          className="flex flex-col gap-2 flex-grow"
          key={`favorite-movies-modal-${movie ? movie.id : index}`}
        >
          <MovieCover
            coverUrl={movie?.posterUrl}
            coverSize="auto"
            coverStyle={movie ? 'primary' : 'secondary'}
            onClick={firstEmptyIndex === index ? onAdd : undefined}
          >
            {firstEmptyIndex === index && (
              <SvgIcon iconType="AiOutlinePlusCircle" size={30} />
            )}
          </MovieCover>

          {movie && (
            <Button
              buttonStyle="danger"
              buttonSize="xs"
              onClick={() => onRemove(movie.id)}
            >
              X
            </Button>
          )}
        </li>
      ))}
    </ul>
  );
};

export default MovieCardsEditable;
