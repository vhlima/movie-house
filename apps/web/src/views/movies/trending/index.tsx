import { FindTrendingMoviesQuery } from '../../../graphql';

import Card from '../../../components/Card';

import Link from '../../../components/Link';

import MovieCover from '../components/Cover';

import RecentReviews from './components/RecentReviews';

import PopularReviews from './components/PopularReviews';

import PageContent from '../../../components/PageContent';

import PopularReviewers from './components/PopularReviewers';

interface MoviesTrendingViewProps {
  trendingMovies: FindTrendingMoviesQuery;
}

const MoviesTrendingView: React.FC<MoviesTrendingViewProps> = ({
  trendingMovies: { trendingMovies },
}) => (
  <PageContent className="flex flex-col gap-4 my-3">
    <Card title="Popular movies this week" noPadding>
      {trendingMovies && (
        <ul className="grid grid-cols-4 sm:flex sm:flex-wrap gap-2">
          {trendingMovies.results.map(movie => (
            <li key={`trending-movie-${movie.id}`}>
              <Link
                href={{ pathname: '/movies/[id]', query: { id: movie.id } }}
              >
                <MovieCover coverUrl={movie.posterUrl} coverSize="auto" />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Card>

    <RecentReviews />

    <PopularReviews />

    <PopularReviewers />
  </PageContent>
);

export default MoviesTrendingView;
