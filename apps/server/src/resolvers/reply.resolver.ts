import {
  Resolver,
  Query,
  Mutation,
  Arg,
  ResolverInterface,
  FieldResolver,
  Root,
  Int,
  ID,
} from 'type-graphql';

import { findUserById } from '../controllers/user.controller';

import Reply from '../entities/commentary/reply.interface';

import { CommentaryModel, LikeModel, ReplyModel } from '../models';

@Resolver(() => Reply)
export default class ReplyResolver implements ResolverInterface<Reply> {
  // TODO really dont know how to find root object without specifiyng _doc

  @FieldResolver(() => Int)
  async likeCount(@Root('_doc') { _id, postId }: Reply) {
    const count = await LikeModel.count({ postId, referenceId: _id });

    return count;
  }

  @Query(() => [Reply])
  async replies(@Arg('commentaryId', () => ID) commentaryId: string) {
    const replies = await ReplyModel.find({
      commentaryId,
    }).populate('user');

    return replies;
  }

  @Mutation(() => Reply)
  async reply(
    @Arg('userId', () => ID) userId: string,
    @Arg('commentaryId', () => ID) commentaryId: string,
    @Arg('body') body: string,
  ) {
    const user = await findUserById(userId);

    const commentaryExists = await CommentaryModel.findById(commentaryId);

    if (!commentaryExists) {
      throw new Error('Commentary not found');
    }

    const reply = await ReplyModel.create({
      user,
      commentaryId,
      body,
    });

    return reply;
  }
}
