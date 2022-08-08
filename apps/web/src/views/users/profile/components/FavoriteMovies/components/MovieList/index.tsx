import type { UserResponse } from '../../../../../../../types/user';

import type { CardIconProps } from '../../../../../../../components/Card';

import Card from '../../../../../../../components/Card';

import MovieCover from '../../../../../../movies/components/Cover';

interface MovieListProps {
  user: UserResponse;
  maxFavorite: number;
  rightIcon?: CardIconProps;
}

const MovieList: React.FC<MovieListProps> = ({
  user,
  maxFavorite,
  rightIcon,
}) => {
  const freeSlotsArray = Array.from(
    {
      length: maxFavorite - user.favoriteMovies.length,
    },
    (v, k) => k,
  );

  return (
    <Card title="Favorite movies" rightIcon={rightIcon} noPadding>
      <div className="grid grid-cols-4 gap-2">
        {user.favoriteMovies.map(movie => (
          <MovieCover
            key={movie.id}
            coverUrl={movie.posterUrl}
            coverSize="full"
          />
        ))}

        {freeSlotsArray.map(slot => (
          <MovieCover key={slot} coverSize="full" />
        ))}
      </div>
    </Card>
  );
};

export default MovieList;
