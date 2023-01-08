import clsx from 'clsx';
import type { Movie } from '../../../../../graphql';

import Button from '../../../../../components/Button';

import SvgIcon from '../../../../../components/SvgIcon';

import MovieCover from '../../../../../components/movie/MovieCover';

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
    ...Array.from({ length: maxMovies - movies.length }).map(() => null),
  ];

  const firstEmptyIndex = movieList.findIndex(m => !m);

  return (
    <ul className="grid grid-cols-4 gap-2">
      {movieList.map((movie, index) =>
        !movie ? (
          <MovieCover
            className={clsx({
              'hover:border-movieHouse-mid': firstEmptyIndex === index,
            })}
            onClick={firstEmptyIndex === index ? onAdd : undefined}
            listItem
          >
            {firstEmptyIndex === index && (
              <SvgIcon iconType="AiOutlinePlusCircle" size={30} />
            )}
          </MovieCover>
        ) : (
          <li className="flex flex-col gap-2">
            <MovieCover
              key={`favorite-movies-modal-${movie ? movie.id : index}`}
              movie={
                movie && {
                  originalTitle: movie.originalTitle,
                  posterUrl: movie.posterUrl,
                }
              }
            />

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
        ),
      )}
    </ul>
  );
};

export default MovieCardsEditable;
