import { Movie, Pagination, PaginationInput } from '../entities';

import { MovieReferenceSortType } from '../enums';

export interface FindMoviesReference {
  handle: (
    referenceId: string,
    props: PaginationInput<MovieReferenceSortType>,
    itemsPerPage?: number,
  ) => Promise<Pagination<Movie>>;
}
