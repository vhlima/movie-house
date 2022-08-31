import type { PropsWithChildren } from 'react';

import clsx from 'clsx';
import Image from '../../../../components/Image';

interface MovieCoverProps {
  coverUrl?: string;

  coverStyle?: 'primary' | 'secondary';
  coverSize?: 'lg' | 'md' | 'sm' | 'full';

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
    'relative rounded-lg border border-grey-700 overflow-hidden flex-shrink-0',
    {
      'flex items-center justify-center text-grey-500 select-none': !coverUrl,

      'w-20 h-28': coverSize === 'sm',
      'w-20 h-40': coverSize === 'lg',
      'w-full h-32 sm:h-44 sm:w-32': coverSize === 'full',

      'border-grey-800': coverStyle === 'primary',
      'border-grey-500': coverStyle === 'secondary',
    },
  );

  return !onClick ? (
    <div className={coverContainerStyle}>
      {coverUrl ? (
        <Image layout="fill" objectFit="fill" src={coverUrl} />
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
      <div className="flex items-center justify-center w-full p-2">
        {children}
      </div>
    </button>
  );
};

export default MovieCover;
