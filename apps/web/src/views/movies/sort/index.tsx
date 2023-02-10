import { MovieSortType } from '../../../graphql';

import type { FindMoviesQuery, MovieSortInput } from '../../../graphql';

import Typography from '../../../components/Typography';

import YearNavigation from '../../../components/Sort/YearNavigation';

import MovieCoverList from '../../../components/movie/MovieCoverList';

import MoviesPageView from '../components/MoviesPageView';

interface MoviesSortPageViewProps extends FindMoviesQuery {
  sort?: MovieSortInput;
}

const MoviesSortPageView: React.FC<MoviesSortPageViewProps> = ({
  sort,
  movies,
}) => {
  const isAnyYearTypeSort = sort
    ? sort.type === MovieSortType.Decade || sort.type === MovieSortType.Year
    : false;

  return (
    <MoviesPageView>
      {isAnyYearTypeSort && (
        <YearNavigation
          path="/movies"
          year={parseInt(sort.filter, 10)}
          isDecade={sort.type === MovieSortType.Decade}
        />
      )}

      {movies.length === 0 ? (
        <Typography component="h2">No movies were found.</Typography>
      ) : (
        <MovieCoverList name="movies-page" movies={movies} />
      )}
    </MoviesPageView>
  );
};

export default MoviesSortPageView;
