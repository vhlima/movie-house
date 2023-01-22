import clsx from 'clsx';

import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

interface MovieCoverButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  containerStyle?: string;
  listItem?: boolean;
}

const MovieCoverButton: React.FC<PropsWithChildren<MovieCoverButtonProps>> = ({
  className,
  containerStyle,
  listItem,
  children,
  ...buttonProps
}) => (
  <button
    type="button"
    {...buttonProps}
    className={clsx('w-full h-full', {
      [className]: !listItem && className,
      [containerStyle]: !listItem,
      'flex flex-col items-center justify-center': listItem,
    })}
  >
    {children}
  </button>
);

export default MovieCoverButton;
