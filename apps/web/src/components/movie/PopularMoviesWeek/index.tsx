import { useFindTrendingMoviesQuery } from '@/gql';

import { Link, Card, SvgIcon } from '@/components';

import { PopularMoviesList } from './components';

export const PopularMoviesWeek: React.FC = () => {
  const { data } = useFindTrendingMoviesQuery({
    variables: { page: 1 },
  });

  const movies = data ? data.trendingMovies.edges.map(edge => edge.node) : [];

  return (
    <Card>
      <Link href="/movies/trending" data-testid="trending-movies-link">
        <Card.Header title="Popular movies this week" marginBottom>
          <SvgIcon iconType="FaChevronRight" size={20} />
        </Card.Header>
      </Link>

      <Card.Body>
        <PopularMoviesList movies={movies} />
      </Card.Body>
    </Card>
  );
};
