import { Arg, Mutation, Resolver, Ctx } from 'type-graphql';

import { ReplyEntity } from '../../../infra/entities';

import { ApolloServerContext } from '../../config/apollo-server-context';

import { getCreateReplyService, getDeleteReplyService } from '../../factories';

@Resolver(() => ReplyEntity)
export class ReplyResolver {
  @Mutation(() => ReplyEntity)
  async createReply(
    @Ctx() { user }: ApolloServerContext,
    @Arg('commentaryId') commentaryId: string,
    @Arg('content') content: string,
  ) {
    const createReplyService = getCreateReplyService();

    const replyResponse = await createReplyService.handle(
      commentaryId,
      content,
      user,
    );

    return replyResponse;
  }

  @Mutation(() => Boolean)
  async deleteReply(
    @Ctx() { user }: ApolloServerContext,
    @Arg('replyId') replyId: string,
  ) {
    const deleteReplyService = getDeleteReplyService();

    await deleteReplyService.handle(replyId, user);

    return true;
  }
}
