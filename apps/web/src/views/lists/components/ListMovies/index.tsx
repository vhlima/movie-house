import { MovieCoverList } from '@/components/movie';

import { Pagination } from '@/components';

interface Props {
  currentPage: number;
  totalPages: number;
  movies: Array<{
    id: number;
    originalTitle: string;
    posterUrl: string;
  }>;
}

export const ListMovies: React.FC<Props> = props => {
  const { movies, currentPage, totalPages } = props;

  return (
    <div className="mt-4">
      <MovieCoverList
        className="mb-4 grid-cols-4 sm:grid-cols-8"
        movies={movies}
        name="list-movies"
        link
      />

      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
};
