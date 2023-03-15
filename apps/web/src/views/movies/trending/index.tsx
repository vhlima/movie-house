import { useFindTrendingMoviesQuery } from '@/graphql';

import { Card } from '@/components';

import { MovieCoverList } from '@/components/movie';
import RecentReviews from '../../../components/review/RecentReviews';
import PopularReviewsWeek from '../../../components/review/PopularReviewsWeek';

import PopularReviewers from './components/PopularReviewers';

const MoviesTrendingView: React.FC = () => {
  const { data: trendingMoviesData } = useFindTrendingMoviesQuery({
    variables: { page: 1 },
  });

  if (!trendingMoviesData) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4 my-4">
      <Card>
        <Card.Header title="Popular movies this week" marginBottom />

        <Card.Body>
          {trendingMoviesData && (
            <MovieCoverList
              name="trending-movies-list"
              movies={trendingMoviesData.trendingMovies.edges.map(
                edge => edge.node,
              )}
            />
          )}
        </Card.Body>
      </Card>

      <RecentReviews />

      <PopularReviewsWeek />

      <PopularReviewers />
    </div>
  );
};

export default MoviesTrendingView;
