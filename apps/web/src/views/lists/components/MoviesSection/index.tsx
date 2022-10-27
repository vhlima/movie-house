import { v4 as uuid } from 'uuid';

import type { UserListCustom } from '../../../../graphql';

import { useLogic } from './logic';

import Link from '../../../../components/Link';

import Button from '../../../../components/Button';

import MovieCover from '../../../movies/components/Cover';

import Typography from '../../../../components/Typography';

import QueryState from '../../../../components/QueryState';

interface MoviesSectionProps {
  list: UserListCustom;
}

const MoviesSection: React.FC<MoviesSectionProps> = ({ list }) => {
  const {
    listMoviesResult: { data, error, loading },
    currentPage,
  } = useLogic({ listId: list.id });

  return (
    <section>
      <Typography
        className="font-semibold"
        component="h1"
        color="primary"
        size="xl"
      >
        {list.name}
      </Typography>

      {list.body && <Typography component="p">{list.body}</Typography>}

      <QueryState loading={loading} error={error}>
        <ul className="flex gap-2 flex-wrap mt-2">
          {data &&
            data.userListCustomMovies.edges.map(({ node: { movie } }) => (
              <li key={`movie-list-${movie.id}`}>
                <Link
                  href={{
                    pathname: '/movies/[id]',
                    query: { id: movie.id },
                  }}
                >
                  <MovieCover coverUrl={movie.posterUrl} />
                </Link>
              </li>
            ))}
        </ul>

        {/* <div className="flex items-center justify-center gap-1 mt-2">
          {currentPage > 1 && (
            <Button
              key={uuid()}
              buttonStyle="tertiary"
              buttonSize="xs"
              full={false}
            >
              Back
            </Button>
          )}

          <Typography component="span">{currentPage}</Typography>

          {currentPage + 1 >= data.userListCustomMovies.pageInfo.maxPages && (
            <Button
              key={uuid()}
              buttonStyle="tertiary"
              buttonSize="xs"
              full={false}
            >
              Next
            </Button>
          )}
        </div> */}
      </QueryState>
    </section>
  );
};

export default MoviesSection;
