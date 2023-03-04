import {
  Movie,
  MovieReferenceSortType,
  Pagination,
  PaginationInput,
  PreMadeListType,
} from '../entities';

export interface FindPreMadeListMovies {
  handle(
    userId: string,
    listType: PreMadeListType,
    props: PaginationInput<MovieReferenceSortType>,
  ): Promise<Pagination<Movie>>;
}
