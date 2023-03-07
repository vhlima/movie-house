import { Movie, Pagination, PaginationInput } from '../entities';
import { MovieReferenceSortType } from '../enums';

export interface FindListMovies {
  handle: (
    listId: string,
    props: PaginationInput<MovieReferenceSortType>,
  ) => Promise<Pagination<Movie>>;
}
