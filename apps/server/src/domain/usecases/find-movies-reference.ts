import {
  Movie,
  MovieReferenceSortType,
  Pagination,
  PaginationInput,
} from '../entities';

export interface FindMoviesReference {
  handle: (
    referenceId: string,
    props: PaginationInput<MovieReferenceSortType>,
    itemsPerPage?: number,
  ) => Promise<Pagination<Movie>>;
}
