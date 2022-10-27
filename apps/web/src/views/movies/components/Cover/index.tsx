import type { PropsWithChildren } from 'react';

import clsx from 'clsx';
import Image from '../../../../components/Image';

interface MovieCoverProps {
  coverUrl?: string;

  coverStyle?: 'primary' | 'secondary';
  coverSize?: 'lg' | 'md' | 'sm' | 'xs' | 'full' | 'auto';

  onClick?: () => void;
}

// const emptyCardStyle = clsx(
//   'flex items-center justify-center flex-shrink-0 w-full h-28 rounded-md border-2 text-grey-500 select-none',
//   {
//     'border-grey-800': cardStyle === 'primary',
//     'border-grey-500': cardStyle === 'secondary',
//     'w-full': cardSize === 'full',
//     'w-20 h-28': cardSize === 'sm',
//   },
// );

const MovieCover: React.FC<PropsWithChildren<MovieCoverProps>> = ({
  coverStyle = 'primary',
  coverSize = 'sm',
  coverUrl,
  onClick,
  children,
}) => {
  const coverContainerStyle = clsx(
    'rounded-lg border border-grey-700 flex-shrink-0',
    {
      'relative overflow-hidden': coverUrl,
      'flex items-center justify-center text-grey-500 select-none': !coverUrl,

      'w-14 h-16': coverSize === 'xs',
      'w-20 h-28': coverSize === 'sm',
      'w-20 h-40': coverSize === 'lg',
      'w-full h-32': coverSize === 'full',
      'w-full h-36 sm:w-24 sm:h-40': coverSize === 'auto',

      'border-grey-800': coverStyle === 'primary',
      'border-grey-500': coverStyle === 'secondary',
    },
  );

  return !onClick ? (
    <div className={coverContainerStyle}>
      {coverUrl ? (
        <Image
          layout="fill"
          objectFit="fill"
          src={coverUrl}
          alt={!coverUrl ? 'Empty movie cover' : 'Movie cover'}
        />
      ) : (
        <span className="text-3xl">?</span>
      )}
    </div>
  ) : (
    <button
      className={clsx(
        'outline-none hover:border-movieHouse-mid focus:border-movieHouse-mid',
        coverContainerStyle,
      )}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default MovieCover;
