import {
  PaginationInputModel,
  PaginationPreResponseModel,
  MovieReferenceSortTypeModel,
  MovieReferenceModel,
} from '../models';

export interface IFindMoviesReferenceRepository {
  getMoviesByReferenceId(
    referenceId: string,
    props: PaginationInputModel<MovieReferenceSortTypeModel>,
  ): Promise<PaginationPreResponseModel<MovieReferenceModel>>;
}
