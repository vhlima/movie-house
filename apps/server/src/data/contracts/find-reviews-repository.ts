import {
  PaginationInputModel,
  ReviewModel,
  ReviewSortTypeModel,
  PaginationPreResponseModel,
} from '../models';

export interface IFindReviewsRepository {
  getReviews(
    props: PaginationInputModel<ReviewSortTypeModel>,
    userId?: string,
  ): Promise<PaginationPreResponseModel<ReviewModel>>;
}
