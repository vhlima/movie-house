import type { UserResponse } from '../../../../types/user';

import Card from '../../../../components/Card';

import MovieCover from '../../../movies/components/Cover';

interface FavoriteMoviesListProps {
  user: UserResponse;
  maxFavorite: number;
  isOwnProfile?: boolean;
  onClickEdit?: () => void;
}

const FavoriteMoviesList: React.FC<FavoriteMoviesListProps> = ({
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

export default FavoriteMoviesList;
