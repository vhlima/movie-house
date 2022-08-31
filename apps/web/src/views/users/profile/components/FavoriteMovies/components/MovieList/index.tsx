import { v4 as uuid } from 'uuid';

import type { PropsWithChildren } from 'react';

import type { FavoriteMovieData } from '../../../../../../../graphql/FavoriteMovie/types';

import type { CardIconProps } from '../../../../../../../components/Card';

import Card from '../../../../../../../components/Card';

import Link from '../../../../../../../components/Link';

import MovieCover from '../../../../../../movies/components/Cover';

interface MovieListProps {
  favoriteMovies: FavoriteMovieData[];
  rightIcon?: CardIconProps;
}

const MovieList: React.FC<PropsWithChildren<MovieListProps>> = ({
  favoriteMovies,
  rightIcon,
  children,
}) => (
  <Card title="Favorite movies" rightIcon={rightIcon} noPadding>
    {favoriteMovies.length > 0 && (
      <ul className="grid grid-cols-4 gap-2">
        {favoriteMovies.map(favoriteMovie =>
          !favoriteMovie ? (
            <li key={uuid()}>
              <MovieCover coverSize="full" />
            </li>
          ) : (
            <li key={favoriteMovie.id}>
              <Link
                href={{
                  pathname: '/movies/[id]',
                  query: { id: favoriteMovie.movie.id },
                }}
              >
                <MovieCover
                  coverUrl={favoriteMovie.movie?.posterUrl}
                  coverSize="full"
                />
              </Link>
            </li>
          ),
        )}
      </ul>
    )}

    {children}
  </Card>
);

export default MovieList;
