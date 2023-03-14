import { Arg, Mutation, Resolver, Ctx } from 'type-graphql';

import { CommentaryEntity } from '../../../infra/entities';

import { ApolloServerContext } from '../../config/apollo-server-context';

import {
  getCreateCommentaryService,
  getDeleteCommentaryService,
} from '../../factories';

@Resolver(() => CommentaryEntity)
export class CommentaryResolver {
  @Mutation(() => CommentaryEntity)
  async createCommentary(
    @Ctx() { user }: ApolloServerContext,
    @Arg('postId') postId: string,
    @Arg('content') content: string,
  ) {
    const createCommentaryService = getCreateCommentaryService();

    const commentaryResponse = await createCommentaryService.handle(
      postId,
      content,
      user,
    );

    return {
      ...commentaryResponse,
      replyCount: 0,
    };
  }

  @Mutation(() => Boolean)
  async deleteCommentary(
    @Ctx() { user }: ApolloServerContext,
    @Arg('commentaryId') commentaryId: string,
  ) {
    const deleteCommentaryService = getDeleteCommentaryService();

    await deleteCommentaryService.handle(commentaryId, user);

    return true;
  }
}
