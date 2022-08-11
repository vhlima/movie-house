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

import Reply from '../entities/postgres/comment/reply.interface';

@Resolver(() => Reply)
export default class ReplyResolver implements ResolverInterface<Reply> {
  // TODO really dont know how to find root object without specifiyng _doc

  @FieldResolver(() => Int)
  async likeCount(@Root('_doc') { id, postId }: Reply) {
    // const count = await LikeModel.count({ postId, referenceId: _id });

    // return count;
    return 0;
  }

  @Query(() => [Reply])
  async replies(@Arg('commentaryId', () => ID) commentaryId: string) {
    // const replies = await ReplyModel.find({
    //   commentaryId,
    // }).populate('user');

    // return replies;

    return [];
  }

  @Mutation(() => Reply)
  async reply(
    @Arg('userId', () => ID) userId: string,
    @Arg('commentaryId', () => ID) commentaryId: string,
    @Arg('body') body: string,
  ) {
    // const user = await findUserById(userId);
    // const commentaryExists = await CommentaryModel.findById(commentaryId);
    // if (!commentaryExists) {
    //   throw new Error('Commentary not found');
    // }
    // const reply = await ReplyModel.create({
    //   user,
    //   commentaryId,
    //   body,
    // });
    // return reply;
  }
}
