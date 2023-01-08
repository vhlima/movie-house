import type { UserListCustom } from '../../../../graphql';

import { useLogic } from './logic';

import Typography from '../../../../components/Typography';

import QueryState from '../../../../components/QueryState';

import MovieCover from '../../../../components/movie/MovieCover';

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
        <ul className="grid gap-2 my-4 grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10">
          {data &&
            data.userListCustomMovies.edges.map(({ node: { movie } }) => (
              <MovieCover
                key={`movie-list-${movie.id}`}
                movie={movie}
                listItem
              />
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
