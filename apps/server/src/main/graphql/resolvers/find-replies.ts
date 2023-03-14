import { Arg, Int, Query, Resolver } from 'type-graphql';

import {
  getFindRepliesPaginatedService,
  getFindRepliesService,
} from '../../factories';

import { ReplySortInput } from '../inputs';

import { ReplyPagination } from '../objects';

@Resolver(() => ReplyPagination)
export class FindRepliesResolver {
  @Query(() => ReplyPagination)
  async replies(
    @Arg('commentaryId') commentaryId: string,
    @Arg('page', () => Int) page: number,
    @Arg('sort', () => ReplySortInput, { nullable: true })
    sort?: ReplySortInput,
  ) {
    const findReviewsService = getFindRepliesService();

    const commentariesResponse = await findReviewsService.handle(commentaryId, {
      page,
      sort,
    });

    const findReviewsPaginationService = getFindRepliesPaginatedService();

    const response = findReviewsPaginationService.handle(
      commentariesResponse.items,
      page,
      commentariesResponse.itemsPerPage,
      commentariesResponse.totalCount,
    );

    return response;
  }
}
