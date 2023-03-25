import type { Movie } from '@/graphql';

import { Typography, ListItem, Button } from '@/components';

import { MovieCover, MovieLink } from '@/components/movie';

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

        <div className="flex items-center">
          <Typography component="span">Directed by:&nbsp;</Typography>
          <Button intent="secondary" size="sm" full={false} href="/">
            Tim Burton
          </Button>
        </div>
      </div>
    </ListItem>
  );
};

export default SearchResultMovie;
