import { useFindTrendingMoviesQuery } from '../../../../graphql';

import Card from '../../../../components/Card';

import MovieCover from '../../../../components/movie/MovieCover';

import MovieCoverOverlay from './components/MovieCoverOverlay';

const PopularMovies: React.FC = () => {
  const { data } = useFindTrendingMoviesQuery({
    variables: { page: 1 },
  });

  return (
    <Card
      title="Popular movies this week"
      link={{ href: '/movies/trending' }}
      noPadding
    >
      <ul className="grid grid-cols-3 sm:grid-cols-6 gap-2">
        {data &&
          data.trendingMovies.results.slice(0, 6).map(movie => (
            <li>
              <MovieCover
                className="group hover:border-movieHouse-light"
                key={`movie-cover-${movie.id}`}
                movie={movie}
              >
                <MovieCoverOverlay />
              </MovieCover>
            </li>
          ))}
      </ul>
    </Card>
  );
};

export default PopularMovies;
