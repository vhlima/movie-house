import { useRouter } from 'next/router';

// import { MovieSortType } from '../../../graphql';

import type { DiscoverMoviesQuery } from '../../../graphql';

import Typography from '../../../components/Typography';

import YearNavigation from '../../../components/Sort/YearNavigation';

import MovieCoverList from '../../../components/movie/MovieCoverList';

import MoviesPageView from '../components/MoviesPageView';
import Pagination from '../../../components/Pagination';

interface MoviesSortPageViewProps extends DiscoverMoviesQuery {
  // sort?: MovieSortInput;
  sort?: any;
}

const MoviesSortPageView: React.FC<MoviesSortPageViewProps> = ({
  sort,
  discoverMovies,
}) => {
  // const isAnyYearTypeSort = sort
  //   ? sort.type === MovieSortType.Decade || sort.type === MovieSortType.Year
  //   : false;

  const isAnyYearTypeSort = false;

  const { asPath } = useRouter();

  const dynamicPathname = asPath.split('/').slice(0, 4).join('/');

  console.log('dynamic pathname? ', dynamicPathname);

  return (
    <MoviesPageView>
      {isAnyYearTypeSort && (
        <YearNavigation
          path="/movies"
          year={parseInt(sort.filter, 10)}
          // isDecade={sort.type === MovieSortType.Decade}
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

      <Pagination path={dynamicPathname} currentPage={1} totalPages={30} />
    </MoviesPageView>
  );
};

export default MoviesSortPageView;
