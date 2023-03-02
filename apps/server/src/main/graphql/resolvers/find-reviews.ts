import { Arg, Int, Query, Resolver } from 'type-graphql';

import {
  getFindReviewsPaginatedService,
  getFindReviewsService,
} from '../../factories';

import { ReviewSortInput } from '../inputs';

import { ReviewPagination } from '../objects';

@Resolver(() => ReviewPagination)
export class FindReviewsResolver {
  @Query(() => ReviewPagination)
  async reviews(
    @Arg('page', () => Int, { defaultValue: 1 }) page: number,
    @Arg('userId', { nullable: true }) userId?: string,
    @Arg('sort', () => ReviewSortInput, { nullable: true })
    sort?: ReviewSortInput,
  ) {
    const findReviewsService = getFindReviewsService();

    const reviewsResponse = await findReviewsService.handle(
      { page, sort },
      userId,
    );

    const findReviewsPaginationService = getFindReviewsPaginatedService();

    const response = findReviewsPaginationService.handle(
      reviewsResponse.items,
      page,
      reviewsResponse.itemsPerPage,
      reviewsResponse.totalCount,
    );

    return response;
  }
}
