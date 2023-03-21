import type { FindListMoviesQuery } from '@/graphql';

import { MovieCover } from '@/components/movie';
import { Pagination } from '@/components';

interface MoviesSectionProps {
  movies: FindListMoviesQuery['listMovies'];
}

const MoviesSection: React.FC<MoviesSectionProps> = ({ movies }) => {
  const { edges, pageInfo, totalPages } = movies;

  return (
    <div>
      <ul className="grid gap-2 my-4 grid-cols-4 sm:grid-cols-8">
        {edges.map(({ node }) => (
          <li key={`list-movie-${node.id}`}>
            <MovieCover movie={node} />
          </li>
        ))}
      </ul>

      <Pagination currentPage={pageInfo.currentPage} totalPages={totalPages} />
    </div>
  );
};

export default MoviesSection;
