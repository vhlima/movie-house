import { MovieCover } from '@/components/movie';
import { Pagination } from '@/components';
import { useFindListMoviesQuery } from '@/graphql';

import QueryState from '../../../../components/QueryState';

interface MoviesSectionProps {
  listId: string;
}

const MoviesSection: React.FC<MoviesSectionProps> = ({ listId }) => {
  const { data, loading, error } = useFindListMoviesQuery({
    variables: {
      listId,
      page: 1,
    },
  });

  if (!data) {
    return <QueryState loading={loading} error={error} />;
  }

  return (
    <div>
      <ul className="grid gap-2 my-4 grid-cols-4 sm:grid-cols-6 md:grid-cols-8">
        {data.listMovies.edges.map(({ node }) => (
          <li key={`list-movie-${node.id}`}>
            <MovieCover movie={node} />
          </li>
        ))}
      </ul>

      <Pagination currentPage={1} totalPages={1} />
    </div>
  );
};

export default MoviesSection;
