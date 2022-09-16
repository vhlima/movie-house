import { v4 as uuid } from 'uuid';

import type { Movie } from '../../../../../graphql';

import Button from '../../../../../components/Button';

import SvgIcon from '../../../../../components/SvgIcon';

import MovieCover from '../../../../movies/components/Cover';
import Link from '../../../../../components/Link';

type MoviesArrayType = Array<Movie | null>;

interface MovieCardListProps {
  movies: MoviesArrayType;
  maxMovies: number;

  onClickAdd?: () => void;
  onClickRemove?: (movieId: number) => void;
}

const MovieCardList: React.FC<MovieCardListProps> = ({
  movies,
  maxMovies,
  onClickAdd,
  onClickRemove,
}) => (
  <ul className="grid grid-cols-4 gap-2">
    {movies.map(movie => (
      <div className="flex flex-col gap-2" key={`card-list-${movie.id}`}>
        {!onClickRemove ? (
          <Link
            href={{
              pathname: '/movies/[id]',
              query: { id: movie.id },
            }}
          >
            <MovieCover coverUrl={movie?.posterUrl} coverSize="full" />
          </Link>
        ) : (
          <>
            <MovieCover coverUrl={movie?.posterUrl} coverSize="full" />

            <Button
              buttonStyle="danger"
              buttonSize="xs"
              onClick={() => onClickRemove(movie.id)}
            >
              X
            </Button>
          </>
        )}
      </div>
    ))}

    {Array.from({ length: maxMovies - movies.length }).map((_, index) => (
      <MovieCover
        key={uuid()}
        coverStyle="secondary"
        coverSize="full"
        onClick={onClickAdd && index === 0 && onClickAdd}
      >
        {onClickAdd && index === 0 && (
          <SvgIcon iconType="AiOutlinePlusCircle" size={30} />
        )}
      </MovieCover>
    ))}
  </ul>
);

export default MovieCardList;
