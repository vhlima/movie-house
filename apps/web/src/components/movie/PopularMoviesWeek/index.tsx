import { useFindTrendingMoviesQuery } from '../../../graphql';

import Card from '../../Card';
import Link from '../../Link';
import SvgIcon from '../../SvgIcon';
import Typography from '../../Typography';

import MovieCover from '../MovieCover';

const PopularMoviesWeek: React.FC = () => {
  const { data } = useFindTrendingMoviesQuery({
    variables: { page: 1 },
  });

  const hasAnyMovie = data ? data.trendingMovies.results.length > 0 : false;

  return (
    <Card>
      <Link href="/movies/trending">
        <Card.Header title="Popular movies this week" marginBottom>
          <SvgIcon iconType="FaChevronRight" size={20} />
        </Card.Header>
      </Link>

      <Card.Body>
        {!hasAnyMovie ? (
          <Typography component="h2">No movies were found.</Typography>
        ) : (
          <ul className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {data.trendingMovies.results.slice(0, 6).map(movie => (
              <li key={`movie-cover-${movie.id}`}>
                <MovieCover
                  className="group hover:border-movieHouse-light"
                  movie={movie}
                />
              </li>
            ))}
          </ul>
        )}
      </Card.Body>
    </Card>
  );
};

export default PopularMoviesWeek;
