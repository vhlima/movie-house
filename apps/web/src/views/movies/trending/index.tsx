import { FindTrendingMoviesQuery } from '@/graphql';

import { Card, PageContent } from '@/components';

import { MovieCoverList } from '@/components/movie';
import RecentReviews from '../../../components/review/RecentReviews';
import PopularReviewsWeek from '../../../components/review/PopularReviewsWeek';

import PopularReviewers from './components/PopularReviewers';

interface Props {
  movies: FindTrendingMoviesQuery['trendingMovies'];
}

const MoviesTrendingView: React.FC<Props> = ({ movies }) => (
  <PageContent className="flex flex-col gap-4 my-4">
    <Card>
      <Card.Header title="Popular movies this week" marginBottom />

      <Card.Body>
        {movies && (
          <MovieCoverList
            name="trending-movies-list"
            movies={movies.edges.map(edge => edge.node)}
          />
        )}
      </Card.Body>
    </Card>

    <RecentReviews />

    <PopularReviewsWeek />

    <PopularReviewers />
  </PageContent>
);

export default MoviesTrendingView;
