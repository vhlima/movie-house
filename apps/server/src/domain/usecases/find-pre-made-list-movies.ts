import { Movie, Pagination, PaginationInput } from '../entities';
import { MovieReferenceSortType, PreMadeListType } from '../enums';

export interface FindPreMadeListMovies {
  handle(
    userId: string,
    listType: PreMadeListType,
    props: PaginationInput<MovieReferenceSortType>,
  ): Promise<Pagination<Movie>>;
}
