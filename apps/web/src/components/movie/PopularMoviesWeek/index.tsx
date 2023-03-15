import { useFindTrendingMoviesQuery } from '@/graphql';

import { Typography } from '@/components';
import Card from '../../Card';
import Link from '../../Link';
import SvgIcon from '../../SvgIcon';

import MovieCover from '../MovieCover';

const PopularMoviesWeek: React.FC = () => {
  const { data } = useFindTrendingMoviesQuery({
    variables: { page: 1 },
  });

  const hasAnyMovie = data ? data.trendingMovies.edges.length > 0 : false;

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
            {data.trendingMovies.edges.slice(0, 6).map(edge => (
              <li key={`movie-cover-${edge.node.id}`}>
                <MovieCover
                  className="group hover:border-movieHouse-light"
                  movie={edge.node}
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
