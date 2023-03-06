import { Review, PaginationPreResponse, PaginationInput } from '../entities';

export interface FindReviews {
  handle: (
    props: PaginationInput<ReviewSortType>,
    userId?: string,
  ) => Promise<PaginationPreResponse<Review>>;
}
