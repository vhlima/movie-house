import type {
  FindUserPreMadeListMoviesQuery,
  FindUserQuery,
} from '../../../graphql';

import Typography from '../../../components/Typography';

import MovieCoverList from '../../../components/movie/MovieCoverList';

import UserProfileHeader from '../components/UserProfileHeader';
import MovieListSortButtons from './components/MovieListSortButtons';

interface UserFilmsViewProps {
  user: FindUserQuery['user'];
  movies: FindUserPreMadeListMoviesQuery['userPreMadeListMovies'];
}

const UserFilmsView: React.FC<UserFilmsViewProps> = ({ user, movies }) => {
  const { username } = user;

  return (
    <UserProfileHeader user={user}>
      <div className="flex items-center gap-2 border-b border-b-grey-800">
        <Typography className="uppercase" component="h1" size="sm">
          {username} watched {movies.length}{' '}
          {movies.length === 1 ? 'movie' : 'movies'}
        </Typography>

        <MovieListSortButtons />
      </div>

      {!movies || movies.length === 0 ? (
        <Typography className="text-center" component="h1">
          No movies added yet.
        </Typography>
      ) : (
        <MovieCoverList
          name="user-profile-film-list"
          movies={movies.map(preMadeMovie => preMadeMovie.movie)}
        />
      )}
    </UserProfileHeader>
  );
};

export default UserFilmsView;
