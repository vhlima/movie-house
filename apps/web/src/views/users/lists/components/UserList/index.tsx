import type { Movie, User, UserListCustom } from '../../../../../graphql';

import Link from '../../../../../components/Link';

import SvgIcon from '../../../../../components/SvgIcon';

import ListItem from '../../../../../components/ListItem';

import Typography from '../../../../../components/Typography';

import TextShorter from '../../../../../components/TextShorter';

import MovieCover from '../../../../../components/movie/MovieCover';

interface UserListMoviesCardProps {
  user: User;
  list: UserListCustom;
}

const UserListMoviesCard: React.FC<UserListMoviesCardProps> = ({
  user,
  list,
}) => {
  const movies: Array<Movie | null> = [...list.featuredMovies];

  if (movies.length < 4) {
    Array.from({ length: 4 - movies.length }).map(() => movies.push(null));
  }

  return (
    <ListItem>
      <Link
        href={{
          pathname: '/lists/[id]',
          query: { id: list.id },
        }}
      >
        <ul className="grid gap-2 grid-cols-4 sm:grid-cols-6 md:grid-cols-8">
          {movies.map((movie, index) => (
            // <li
            //   className="relative flex-grow sm:flex-grow-0"
            //   style={{ zIndex: index + 1 }}
            //   key={`movie-card-list-${!movie ? uuid() : movie.id}`}
            // >
            <MovieCover
              key={`movie-card-list-${!movie ? `null-${index}` : movie.id}`}
              movie={
                movie && {
                  originalTitle: movie.originalTitle,
                  posterUrl: movie.posterUrl,
                }
              }
              listItem
            />
          ))}
        </ul>

        <Typography
          className="font-semibold hover:text-grey-200 mt-2"
          component="h1"
          color="primary"
          size="lg"
        >
          {list.name}
        </Typography>
      </Link>

      <div className="flex items-center gap-1">
        <SvgIcon className="text-grey-300" iconType="TbMovie" size={24} />

        <Typography component="span" color="primary">
          {list.totalCount} movies
        </Typography>
      </div>

      {list.body && (
        <TextShorter
          className="text-grey-200 mt-1"
          text={list.body}
          maxCharacters={120}
        />
      )}

      <div className="flex gap-2 items-center mt-1 ml-auto">
        <div className="flex items-center gap-1">
          <SvgIcon className="text-grey-300" iconType="AiFillHeart" size={24} />
          <Typography component="span">3.6k</Typography>
        </div>

        <div className="flex items-center gap-1">
          <SvgIcon
            className="text-grey-300"
            iconType="BsFillChatLeftFill"
            size={18}
          />
          <Typography component="span">3.6k</Typography>
        </div>
      </div>
    </ListItem>
  );
};

export default UserListMoviesCard;
