import {
  PaginationInputModel,
  MovieReferenceSortTypeModel,
  MovieReferenceModel,
  PaginationRepositoryResponseModel,
} from '../models';

export interface IFindMoviesReferenceRepository {
  getMoviesReferenceById(
    referenceId: string,
    props: PaginationInputModel<MovieReferenceSortTypeModel>,
  ): Promise<PaginationRepositoryResponseModel<MovieReferenceModel>>;
}
