import { useFindTrendingMoviesQuery } from '../../../graphql';

import Card from '../../../components/Card';

import MovieCover from '../../../components/movie/MovieCover';

import RecentReviews from './components/RecentReviews';

import PopularReviewsWeek from '../../../components/review/PopularReviewsWeek';

import PageContent from '../../../components/PageContent';

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
      <Card title="Popular movies this week" noPadding>
        {trendingMoviesData && (
          <ul className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-10 gap-2">
            {trendingMoviesData.trendingMovies.results.map(movie => (
              <li key={`trending-movie-${movie.id}`}>
                <MovieCover movie={movie} />
              </li>
            ))}
          </ul>
        )}
      </Card>

      <RecentReviews />

      <PopularReviewsWeek />

      <PopularReviewers />
    </div>
  );
};

export default MoviesTrendingView;
