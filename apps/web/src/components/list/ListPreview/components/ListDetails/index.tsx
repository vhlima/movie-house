import type { PropsWithChildren } from 'react';

import { Link, Typography } from '@/components';

interface Props {
  id: string;
  name: string;
  movieCount: number;
}

export const ListDetails: React.FC<PropsWithChildren<Props>> = props => {
  const { id, name, movieCount, children } = props;

  return (
    <div className="w-full">
      <Link
        className="block"
        href={{
          pathname: '/lists/[id]',
          query: { id },
        }}
        data-testid="list-link"
      >
        <Typography
          className="font-bold"
          component="h2"
          color="primary"
          size="lg"
          hover
          data-testid="list-name"
        >
          {name}
        </Typography>
      </Link>

      <Typography component="span" color="tertiary" size="sm">
        <span data-testid="movie-count">{movieCount}</span>
        <span>&nbsp;{movieCount === 1 ? 'movie' : 'movies'}</span>
      </Typography>

      {children}
    </div>
  );
};
