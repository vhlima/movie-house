import {
  PaginationInputModel,
  ReviewModel,
  PaginationPreResponseModel,
} from '../models';

import { ReviewSortType } from '../enums';

export interface IFindReviewsRepository {
  getReviews(
    props: PaginationInputModel<ReviewSortType>,
    userId?: string,
  ): Promise<PaginationPreResponseModel<ReviewModel>>;
}
