import clsx from 'clsx';

import type { UserResponse } from '../../../../types/user';

import Card from '../../../../components/Card';

import SvgIcon from '../../../../components/SvgIcon';

import MovieCover from '../../../movies/components/Cover';
import EmptyMovieCard from '../Personal/components/EmptyCard';

interface FavoriteMoviesBaseProps {
  user: UserResponse;
  maxFavorite: number;
  isOwnProfile?: boolean;
  onClickEdit?: () => void;
}

const FavoriteMoviesBase: React.FC<FavoriteMoviesBaseProps> = ({
  user,
  maxFavorite,
  isOwnProfile,
  onClickEdit,
}) => {
  const freeSlotsArray = Array.from(
    {
      length: maxFavorite - user.favoriteMovies.length,
    },
    (v, k) => k,
  );

  return (
    <Card
      title="Favorite movies"
      rightIcon={
        isOwnProfile && { iconType: 'FaPencilAlt', onClick: onClickEdit }
      }
      noPadding
    >
      <div className="grid grid-cols-4 gap-2 h-28">
        {user.favoriteMovies.map(movie => (
          <MovieCover
            key={movie.id}
            coverUrl={movie.posterUrl}
            coverSize="full"
          />
        ))}

        {freeSlotsArray.map(slot => (
          <EmptyMovieCard key={slot} />
        ))}
      </div>
    </Card>
  );
};

export default FavoriteMoviesBase;
