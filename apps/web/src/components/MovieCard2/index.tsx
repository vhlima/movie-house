import React from 'react';

import Image from 'next/image';
import clsx from 'clsx';

interface MovieCardProps {
  movieCoverUrl: string;
  cardSize?: 'lg' | 'md' | 'sm' | 'full';
}

const MovieCard: React.FC<MovieCardProps> = ({
  cardSize = 'sm',
  movieCoverUrl,
}) => (
  <div
    className={clsx(
      'relative rounded-lg border border-grey-700 overflow-hidden',
      {
        'w-20 h-28': cardSize === 'sm',
        'w-full h-full': cardSize === 'full',
      },
    )}
  >
    <Image layout="fill" objectFit="fill" src={movieCoverUrl} />
  </div>
);

export default MovieCard;
