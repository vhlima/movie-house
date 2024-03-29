import clsx from 'clsx';

import type { ReactNode } from 'react';

import type { Movie } from '@/gql';

import { MovieCover } from '@/components/movie';

type MovieType = Pick<Movie, 'id' | 'originalTitle' | 'posterUrl'>;

interface MovieCoverListProps {
  className?: string;
  name: string;
  movies: MovieType[];
  empty?: number;
  link?: boolean;

  renderCover?: (
    index: number,
    movie?: MovieType,
  ) => ReactNode | { children: ReactNode; className?: string };
}

export const MovieCoverList: React.FC<MovieCoverListProps> = ({
  className,
  name,
  movies,
  empty,
  link = true,
  renderCover,
}) => (
  <ul
    className={clsx('grid gap-1 sm:gap-2', {
      [className]: !!className,
      'grid-cols-4 sm:grid-cols-8': !className,
    })}
  >
    {movies.map((movie, index) => {
      const coverProps = renderCover ? renderCover(index, movie) : undefined;

      const isCustomCoverProps =
        coverProps &&
        typeof coverProps === 'object' &&
        'children' in coverProps;

      return (
        <li
          className={clsx({
            'flex flex-col gap-2': coverProps,
          })}
          key={`movie-cover-list-${name}-${movie.id}`}
        >
          <MovieCover
            className={isCustomCoverProps && coverProps.className}
            movie={movie}
            link={link}
          />

          {coverProps &&
            (isCustomCoverProps
              ? coverProps.children
              : (coverProps as ReactNode))}
        </li>
      );
    })}

    {Array.from({ length: empty })
      .map((_, index) => index + 1)
      .map((n, index) => {
        const coverProps = renderCover ? renderCover(index) : undefined;

        return (
          <li key={`movie-cover-list-empty-${name}-${n}`}>
            <MovieCover
              className={
                coverProps &&
                typeof coverProps === 'object' &&
                'className' in coverProps
                  ? coverProps.className
                  : ''
              }
            >
              {coverProps &&
                (typeof coverProps === 'object' && 'children' in coverProps
                  ? coverProps.children
                  : coverProps)}
            </MovieCover>
          </li>
        );
      })}
  </ul>
);
