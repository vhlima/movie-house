import { Arg, Int, Query, Resolver } from 'type-graphql';

import {
  getFindCommentariesPaginatedService,
  getFindCommentariesService,
} from '../../factories';

import { CommentarySortInput } from '../inputs';

import { CommentaryPagination } from '../objects';

@Resolver(() => CommentaryPagination)
export class FindCommentariesResolver {
  @Query(() => CommentaryPagination)
  async commentaries(
    @Arg('postId') postId: string,
    @Arg('page', () => Int) page: number,
    @Arg('sort', () => CommentarySortInput, { nullable: true })
    sort?: CommentarySortInput,
  ) {
    const findCommentariesService = getFindCommentariesService();

    const commentariesResponse = await findCommentariesService.handle(postId, {
      page,
      sort,
    });

    const findReviewsPaginationService = getFindCommentariesPaginatedService();

    const response = findReviewsPaginationService.handle(
      commentariesResponse.items,
      page,
      commentariesResponse.itemsPerPage,
      commentariesResponse.totalCount,
    );

    return {
      ...response,
      edges: response.edges.map(commentary => ({
        ...commentary,
        replyCount: 0,
      })),
    };
  }
}
