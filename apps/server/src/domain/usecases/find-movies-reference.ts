import {
  MovieReference,
  MovieReferenceSortType,
  PaginationInput,
  PaginationPreResponse,
} from '../entities';

export interface FindMoviesReference {
  handle: (
    referenceId: string,
    props: PaginationInput<MovieReferenceSortType>,
  ) => Promise<PaginationPreResponse<MovieReference>>;
}
