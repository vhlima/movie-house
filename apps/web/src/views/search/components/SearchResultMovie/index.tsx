import type { Movie } from '@/graphql';

import { Typography } from '@/components';
import { Link } from '../../../../components/Link';
import ListItem from '../../../../components/ListItem';
import MovieLink from '../../../../components/movie/MovieLink';
import MovieCover from '../../../../components/movie/MovieCover';

interface SearchResultMovieProps {
  movie: Pick<Movie, 'id' | 'originalTitle' | 'posterUrl' | 'releaseDate'>;
}

const SearchResultMovie: React.FC<SearchResultMovieProps> = ({ movie }) => {
  const { id, originalTitle, releaseDate } = movie;

  return (
    <ListItem className="flex gap-2">
      <MovieCover movie={movie} sizeType="sm" />

      <div className="flex flex-col gap-2">
        <MovieLink movieId={id}>
          <Typography
            className="font-bold"
            component="h2"
            color="primary"
            size="xl"
          >
            {originalTitle}

            <Typography className="font-normal" component="span" size="xl">
              &nbsp;({new Date(releaseDate).getFullYear()})
            </Typography>
          </Typography>
        </MovieLink>

        <Typography component="p">
          Alternative titles: Betmen, Netopierí muž, Tim Burtons Batman
        </Typography>

        <Typography component="p">
          Directed by:&nbsp;
          <Link className="rounded-md p-1 bg-grey-800" href="/">
            Tim Burton
          </Link>
        </Typography>
      </div>
    </ListItem>
  );
};

export default SearchResultMovie;
