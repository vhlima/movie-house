import type { FindListMoviesQuery } from '@/graphql';

import { MovieCoverList } from '@/components/movie';

import { Pagination } from '@/components';

interface MoviesSectionProps {
  movies: FindListMoviesQuery['listMovies'];
}

const MoviesSection: React.FC<MoviesSectionProps> = ({ movies }) => {
  const { edges, pageInfo, totalPages } = movies;

  return (
    <div>
      <MovieCoverList
        className="my-4 grid-cols-4 sm:grid-cols-8"
        movies={edges.map(edge => edge.node)}
        name="list-movies"
        link
      />

      <Pagination currentPage={pageInfo.currentPage} totalPages={totalPages} />
    </div>
  );
};

export default MoviesSection;
