import clsx from 'clsx';

import type { PropsWithChildren } from 'react';

import { Link } from '@/components';

interface MovieLinkProps {
  className?: string;
  movieId: number;
}

const MovieLink: React.FC<PropsWithChildren<MovieLinkProps>> = ({
  className,
  movieId,
  children,
}) => (
  <Link
    className={clsx(className && className)}
    href={{
      pathname: '/movies/[id]',
      query: { id: movieId },
    }}
  >
    {children}
  </Link>
);

export default MovieLink;
