import { FindTrendingMoviesQuery } from '../../../graphql';

import Card from '../../../components/Card';

import MovieCover from '../../../components/movie/MovieCover';

import RecentReviews from './components/RecentReviews';

import PopularReviews from './components/PopularReviews';

import PageContent from '../../../components/PageContent';

import PopularReviewers from './components/PopularReviewers';

import MovieLink from '../../../components/movie/MovieLink';

interface MoviesTrendingViewProps {
  trendingMovies: FindTrendingMoviesQuery;
}

const MoviesTrendingView: React.FC<MoviesTrendingViewProps> = ({
  trendingMovies: { trendingMovies },
}) => (
  <PageContent className="flex flex-col gap-4 my-3">
    <Card title="Popular movies this week" noPadding>
      {trendingMovies && (
        <ul className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-10 gap-2">
          {trendingMovies.results.map(movie => (
            <li key={`trending-movie-${movie.id}`}>
              <MovieLink movieId={movie.id}>
                <MovieCover
                  movie={{
                    originalTitle: movie.originalTitle,
                    posterUrl: movie.posterUrl,
                  }}
                />
              </MovieLink>
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
