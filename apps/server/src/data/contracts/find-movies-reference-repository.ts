import {
  PaginationInputModel,
  MovieReferenceModel,
  PaginationRepositoryResponseModel,
} from '../models';

import { MovieReferenceSortType } from '../enums';

export interface IFindMoviesReferenceRepository {
  getMoviesReferenceById(
    referenceId: string,
    props: PaginationInputModel<MovieReferenceSortType>,
  ): Promise<PaginationRepositoryResponseModel<MovieReferenceModel>>;
}
