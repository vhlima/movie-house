import clsx from 'clsx';

import type { PropsWithChildren } from 'react';

import type { Movie } from '@/gql';

import { Typography, Image } from '@/components';

import { MovieLink } from '@/components/movie';

interface MovieCover2Props {
  className?: string;
  sizeType?: 'sm' | 'md';
  movie?: Pick<Movie, 'id' | 'originalTitle' | 'posterUrl'>;
  link?: boolean;
  borderHover?: boolean;

  width?: number;
  height?: number;
}

export const MovieCover: React.FC<PropsWithChildren<MovieCover2Props>> = ({
  className,
  sizeType,
  movie,
  link = true,
  borderHover = true,
  width = 250,
  height = 250,
  children,
}) => {
  const hasMovieAndPoster = movie && movie.posterUrl;

  const movieCoverImageJsx = hasMovieAndPoster && (
    <Image
      className="w-full h-full"
      title={movie.originalTitle}
      width={width}
      height={height}
      src={movie.posterUrl}
      alt={movie.originalTitle}
    />
  );

  const movieCoverBodyJsx =
    !link || !hasMovieAndPoster ? (
      movieCoverImageJsx
    ) : (
      <MovieLink movieId={movie.id}>{movieCoverImageJsx}</MovieLink>
    );

  return (
    <div
      className={clsx(
        'relative select-none text-grey-500 rounded-md overflow-hidden border border-grey-600 flex-shrink-0',
        {
          'transition-colors hover:border-movieHouse-mid focus-within:border-movieHouse-mid':
            borderHover,
          'max-w-[6rem] min-w-[5rem] max-h-[8.75rem]': sizeType === 'sm',
          'max-w-[7rem] min-w-[7rem] max-h-[11rem]': sizeType === 'md',
          'w-fit h-full': hasMovieAndPoster,
          'flex items-center justify-center w-full h-full': !hasMovieAndPoster,
          [className]: !!className,
        },
      )}
    >
      {movieCoverBodyJsx}

      {!children && !hasMovieAndPoster ? (
        <Typography component="span" size="3xl" color="quaternary">
          ?
        </Typography>
      ) : (
        children
      )}
    </div>
  );
};
