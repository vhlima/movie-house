import { Review, PaginationPreResponse, PaginationInput } from '../entities';

export enum ReviewSortType {
  YEAR = 'YEAR',
  PINNED = 'PINNED',
  POPULAR = 'POPULAR',
  POPULAR_WEEK = 'POPULAR_WEEK',
  RECENT = 'RECENT',
  OLDER = 'OLDER',
}

export interface FindReviews {
  handle: (
    props: PaginationInput<ReviewSortType>,
    userId?: string,
  ) => Promise<PaginationPreResponse<Review>>;
}
