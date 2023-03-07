import { TmDbMovieSortInput, TmDbMovieSortType } from '../../../graphql';

import type { DiscoverMoviesQuery } from '../../../graphql';

import Typography from '../../../components/Typography';

import YearNavigation from '../../../components/Sort/YearNavigation';

import MovieCoverList from '../../../components/movie/MovieCoverList';

import MoviesPageView from '../components/MoviesPageView';
import Pagination from '../../../components/Pagination';

interface MoviesSortPageViewProps extends DiscoverMoviesQuery {
  sort?: TmDbMovieSortInput;
}

const MoviesSortPageView: React.FC<MoviesSortPageViewProps> = ({
  sort,
  discoverMovies,
}) => {
  const isAnyYearTypeSort = sort
    ? sort.type === TmDbMovieSortType.Decade ||
      sort.type === TmDbMovieSortType.Year
    : false;

  return (
    <MoviesPageView>
      {isAnyYearTypeSort && (
        <YearNavigation
          path="/movies"
          year={parseInt(sort.filter, 10)}
          isDecade={sort.type === TmDbMovieSortType.Decade}
        />
      )}

      {discoverMovies.edges.length === 0 ? (
        <Typography component="h2">No movies were found.</Typography>
      ) : (
        <MovieCoverList
          name="movies-page"
          movies={discoverMovies.edges.map(edge => edge.node)}
        />
      )}

      <Pagination
        currentPage={discoverMovies.pageInfo.currentPage}
        totalPages={discoverMovies.totalPages}
      />
    </MoviesPageView>
  );
};

export default MoviesSortPageView;
