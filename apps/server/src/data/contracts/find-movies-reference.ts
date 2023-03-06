import {
  PaginationInputModel,
  PaginationPreResponseModel,
  MovieReferenceModel,
} from '../models';

import { MovieReferenceSortType } from '../enums';

export interface IFindMoviesReferenceRepository {
  getMoviesByReferenceId(
    referenceId: string,
    props: PaginationInputModel<MovieReferenceSortType>,
  ): Promise<PaginationPreResponseModel<MovieReferenceModel>>;
}
