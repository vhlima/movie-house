import React from 'react';

import Image from 'next/image';

import clsx from 'clsx';

interface MovieCoverProps {
  coverUrl: string;
  coverSize?: 'lg' | 'md' | 'sm' | 'full';
}

const MovieCover: React.FC<MovieCoverProps> = ({
  coverSize = 'sm',
  coverUrl,
}) => (
  <div
    className={clsx(
      'relative rounded-lg border border-grey-700 overflow-hidden flex-shrink-0',
      {
        'w-20 h-28': coverSize === 'sm',
        'w-full h-full': coverSize === 'full',
      },
    )}
  >
    <Image layout="fill" objectFit="fill" src={coverUrl} />
  </div>
);

export default MovieCover;
