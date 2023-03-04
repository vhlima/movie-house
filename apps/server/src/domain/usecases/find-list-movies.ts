import {
  Movie,
  MovieReferenceSortType,
  Pagination,
  PaginationInput,
} from '../entities';

export interface FindListMovies {
  handle: (
    listId: string,
    props: PaginationInput<MovieReferenceSortType>,
  ) => Promise<Pagination<Movie>>;
}
