import clsx from 'clsx';

import type { PropsWithChildren } from 'react';

import type { Movie } from '@/gql';

import { Image, Typography } from '@/components';

import { MovieLink } from '@/components/movie';

import emptyCover from '../../../../public/empty_cover.png';

export type MovieCoverSize = 'sm' | 'md' | 'lg';

interface Props {
  className?: string;
  movie?: Pick<Movie, 'id' | 'originalTitle' | 'posterUrl'>;

  size?: MovieCoverSize;
  link?: boolean;
  borderHover?: boolean;
}

const coverSizes: {
  [key in MovieCoverSize]: { width: number; height: number };
} = {
  sm: {
    width: 90,
    height: 140,
  },
  md: {
    width: 120,
    height: 180,
  },
  lg: {
    width: 160,
    height: 248,
  },
};

export const NewMovieCover: React.FC<PropsWithChildren<Props>> = ({
  className,
  size = 'md',
  movie,
  link = true,
  borderHover,
  children,
}) => {
  const hasMovieAndPoster = !!(movie && movie.posterUrl);

  const { width, height } = coverSizes[size];

  const movieImageJsx = (
    <>
      <Image
        className="h-full"
        title={movie && movie.originalTitle}
        width={width}
        height={height}
        src={hasMovieAndPoster ? movie.posterUrl : emptyCover}
        alt={movie ? movie.originalTitle : 'Empty movie cover'}
        sizes={`(min-width: 640px) ${width}px, (min-width: 768px) ${width}px, (min-width: 1024px) ${width}px, (min-width: 1280px) ${width}px`}
      />

      {!hasMovieAndPoster && !children && (
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 translate-y-1/2">
          <Typography component="span" size="3xl" color="secondary">
            ?
          </Typography>
        </div>
      )}
    </>
  );

  const movieCoverImageJsx = (
    <div
      className={clsx(
        'w-full h-full relative select-none text-grey-500 overflow-hidden rounded-md border border-grey-600',
        {
          'transition-colors hover:border-movieHouse-mid focus-within:border-movieHouse-mid':
            borderHover || (movie && link),
          // 'h-full': hasMovieAndPoster,
          // 'flex items-center justify-center': !hasMovieAndPoster,
          [className]: !!className,
        },
      )}
      style={{ maxWidth: `${width}px`, maxHeight: `${height}px` }}
    >
      {movie && link ? (
        <MovieLink movieId={movie.id}>{movieImageJsx}</MovieLink>
      ) : (
        movieImageJsx
      )}

      {children}

      {/* {!children && !hasMovieAndPoster ? (
        <Typography component="span" size="3xl" color="quaternary">
          ?
        </Typography>
      ) : (
        children
      )} */}
    </div>
  );

  return movieCoverImageJsx;
};
