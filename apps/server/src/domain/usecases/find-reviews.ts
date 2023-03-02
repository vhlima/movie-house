import { Review, PaginationPreResponse, PaginationInput } from '../entities';

export enum ReviewSortType {
  YEAR = 'YEAR',
  PINNED = 'PINNED',
  POPULAR_WEEK = 'POPULAR_WEEK',
  CREATE_DATE_ASC = 'CREATE_DATE_ASC',
  CREATE_DATE_DESC = 'CREATE_DATE_DESC',
}

export interface FindReviews {
  handle: (
    props: PaginationInput<ReviewSortType>,
    userId?: string,
  ) => Promise<PaginationPreResponse<Review>>;
}
