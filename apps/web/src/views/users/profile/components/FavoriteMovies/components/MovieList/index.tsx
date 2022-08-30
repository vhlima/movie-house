import { v4 as uuid } from 'uuid';

import type { PropsWithChildren } from 'react';

import type { FavoriteMovieData } from '../../../../../../../graphql/FavoriteMovie/types';

import type { CardIconProps } from '../../../../../../../components/Card';

import Card from '../../../../../../../components/Card';

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
      <div className="grid grid-cols-4 gap-2">
        {favoriteMovies.map(favoriteMovie => (
          <MovieCover
            key={favoriteMovie ? favoriteMovie.id : uuid()}
            coverUrl={favoriteMovie?.movie?.posterUrl}
            coverSize="full"
          />
        ))}
      </div>
    )}

    {children}
  </Card>
);

export default MovieList;
