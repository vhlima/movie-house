import clsx from 'clsx';

import type { PropsWithChildren } from 'react';

import type { Movie } from '../../../graphql';

import Image from '../../Image';
import Typography from '../../Typography';

import MovieLink from '../MovieLink';

interface MovieCover2Props {
  className?: string;
  sizeType?: 'sm' | 'md';
  movie?: Pick<Movie, 'id' | 'originalTitle' | 'posterUrl'>;
  link?: boolean;
}

const MovieCover: React.FC<PropsWithChildren<MovieCover2Props>> = ({
  className,
  sizeType,
  movie,
  link = true,
  children,
}) => {
  const movieCoverImageJsx = movie && (
    <Image
      title={movie.originalTitle}
      width={250}
      height={250}
      src={movie.posterUrl}
      alt={movie.originalTitle}
    />
  );

  const movieCoverBodyJsx =
    !link || !movie ? (
      movieCoverImageJsx
    ) : (
      <MovieLink movieId={movie.id}>{movieCoverImageJsx}</MovieLink>
    );

  return (
    <div
      className={clsx(
        'relative w-full h-full select-none text-grey-500 rounded-md overflow-hidden border border-grey-700 transition-colors',
        {
          'max-w-[6rem] min-w-[5rem] max-h-[8.75rem]': sizeType === 'sm',
          'max-w-[7rem] min-w-[7rem] max-h-[11rem]': sizeType === 'md',
          'flex items-center justify-center': !movie,
          [className]: !!className,
        },
      )}
    >
      {movieCoverBodyJsx}

      {!children && !movie ? (
        <Typography component="span" size="3xl" color="quaternary">
          ?
        </Typography>
      ) : (
        children
      )}
    </div>
  );
};

export default MovieCover;
