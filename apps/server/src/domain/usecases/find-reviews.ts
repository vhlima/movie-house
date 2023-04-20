import { Review, PaginationPreResponse, PaginationInput } from '../entities';

import { ReviewSortType } from '../enums';

export interface FindReviews {
  handle: (
    props: PaginationInput<ReviewSortType>,
    userId?: string,
  ) => Promise<PaginationPreResponse<Review>>;
}
