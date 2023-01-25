import clsx from 'clsx';

import type { PropsWithChildren } from 'react';

import type { Movie } from '../../../graphql';

import Image from '../../Image';

import MovieLink from '../MovieLink';

interface MovieCover2Props {
  className?: string;
  sizeType?: 'responsive' | 'sm' | 'md';
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
  const containerClassNames = clsx(
    'relative w-full h-full select-none text-grey-500 rounded-md overflow-hidden border border-grey-700 transition-colors',
    {
      'max-w-[6rem] min-w-[5rem] max-h-[8.75rem]': sizeType === 'sm',
      'max-w-[7rem] min-w-[7rem] max-h-[11rem]': sizeType === 'md',
      'flex items-center justify-center': !movie,
      [className]: !!className,
    },
  );

  const movieCoverBody = (
    <>
      {movie && (
        <Image
          title={movie.originalTitle}
          layout="responsive"
          width={150}
          height={225}
          src={movie.posterUrl}
          alt={movie.originalTitle}
        />
      )}

      {!children && !movie ? <span className="text-3xl">?</span> : children}
    </>
  );

  return !link || !movie ? (
    <div className={containerClassNames}>{movieCoverBody}</div>
  ) : (
    <MovieLink movieId={movie.id}>{movieCoverBody}</MovieLink>
  );
};

export default MovieCover;
