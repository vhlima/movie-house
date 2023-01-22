import clsx from 'clsx';

import type { ReactNode } from 'react';

import type { Movie } from '../../../graphql';

import MovieCover from '../MovieCover';

type MovieType = Pick<Movie, 'id' | 'originalTitle' | 'posterUrl'>;

interface MovieCoverListProps {
  className?: string;
  name: string;
  movies: MovieType[];
  empty?: number;

  renderCover?: (
    index: number,
    movie?: MovieType,
  ) => ReactNode | { children: ReactNode; className?: string };
}

const MovieCoverList: React.FC<MovieCoverListProps> = ({
  className,
  name,
  movies,
  empty,
  renderCover,
}) => (
  <ul className={clsx('grid gap-1 sm:gap-2', className && className)}>
    {movies.map((movie, index) => {
      const coverProps = renderCover ? renderCover(index, movie) : undefined;

      return (
        <MovieCover
          key={`movie-cover-list-${name}-${movie.id}`}
          movie={
            movie && {
              originalTitle: movie.originalTitle,
              posterUrl: movie.posterUrl,
            }
          }
        >
          {coverProps &&
            (typeof coverProps === 'object' && 'children' in coverProps
              ? coverProps.children
              : coverProps)}
        </MovieCover>
      );
    })}

    {Array.from({ length: empty })
      .map((_, index) => index + 1)
      .map((n, index) => {
        const coverProps = renderCover ? renderCover(index) : undefined;

        return (
          <MovieCover
            className={
              coverProps &&
              typeof coverProps === 'object' &&
              'className' in coverProps
                ? coverProps.className
                : ''
            }
            key={`movie-cover-list-empty-${name}-${n}`}
            listItem
          >
            {coverProps &&
              (typeof coverProps === 'object' && 'children' in coverProps
                ? coverProps.children
                : coverProps)}
          </MovieCover>
        );
      })}
  </ul>
);

export default MovieCoverList;
