import clsx from 'clsx';

import type { ReactNode } from 'react';

import type { Movie } from '@/gql';

import { NewMovieCover } from '@/components/movie';

import type { MovieCoverSize } from '@/components/movie';

type MovieType = Pick<Movie, 'id' | 'originalTitle' | 'posterUrl'>;

interface MovieCoverListProps {
  className?: string;
  name: string;
  movies: MovieType[];
  empty?: number;
  link?: boolean;
  size?: MovieCoverSize;

  renderListItem?: (index: number, movie?: MovieType) => ReactNode;
}

export const MovieCoverList2: React.FC<MovieCoverListProps> = ({
  className,
  name,
  movies,
  empty,
  size,
  link = true,
  renderListItem,
}) => {
  const emptyMovieCoversArray = Array.from({ length: empty }).map(
    (_, index) => index + 1,
  );

  return (
    <ul
      className={clsx('flex gap-1 sm:gap-2', {
        [className]: !!className,
        'grid grid-cols-4 sm:grid-cols-5 md:grid-cols-10': !className,
      })}
    >
      {movies.map((movie, index) => {
        const coverChildren = renderListItem && renderListItem(index, movie);

        return (
          <li
            className="flex flex-col gap-2"
            key={`movie-cover-list-${name}-${movie.id}`}
          >
            <NewMovieCover movie={movie} link={link} size={size} />

            {coverChildren}
          </li>
        );
      })}

      {emptyMovieCoversArray.map((n, index) => {
        const coverChildren = renderListItem && renderListItem(index);

        return (
          <li key={`movie-cover-empty-${name}-${n}`}>
            <NewMovieCover
              borderHover={index === 0 && !!coverChildren}
              size={size}
            >
              {coverChildren}
            </NewMovieCover>
          </li>
        );
      })}
    </ul>
  );
};
