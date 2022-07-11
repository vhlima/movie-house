import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

import clsx from 'clsx';

interface EmptyMovieCardProps
  extends Partial<ButtonHTMLAttributes<HTMLButtonElement>> {
  cardStyle?: 'primary' | 'secondary';
}

const EmptyMovieCard: React.FC<PropsWithChildren<EmptyMovieCardProps>> = ({
  cardStyle = 'primary',
  onClick,
  children,
  ...buttonProps
}) => {
  const emptyCardStyle = clsx(
    'flex items-center justify-center w-full h-28 rounded-md border-2 text-grey-500 select-none',
    {
      'border-grey-800': cardStyle === 'primary',
      'border-grey-500': cardStyle === 'secondary',
    },
  );

  return !onClick ? (
    <div className={emptyCardStyle}>
      <span className="text-3xl">?</span>
    </div>
  ) : (
    <button
      className={clsx(
        'overflow-hidden outline-none hover:border-movieHouse-mid focus:border-movieHouse-mid',
        emptyCardStyle,
      )}
      type="button"
      onClick={onClick}
      {...buttonProps}
    >
      <div className="flex items-center justify-center w-full p-2">
        {children}
      </div>
    </button>
  );
};

export default EmptyMovieCard;
