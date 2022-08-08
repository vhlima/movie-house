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

import { CommentaryModel, LikeModel, ReplyModel } from '../models';

import Commentary from '../entities/commentary/commentary.interface';
import CommentariesPaginated from '../entities/pagination/commentaries';

@Resolver(() => Commentary)
export default class CommentaryResolver
  implements ResolverInterface<Commentary>
{
  // TODO really dont know how to find root object without specifiyng _doc

  @FieldResolver(() => Int)
  async likeCount(@Root('_doc') commentary: Commentary) {
    const count = await LikeModel.count({
      postId: commentary.postId,
      referenceId: commentary._id,
    });

    return count;
  }

  @FieldResolver(() => Int)
  async replyCount(@Root('_doc') commentary: Commentary) {
    const count = await ReplyModel.count({
      commentaryId: commentary._id,
    });

    return count;
  }

  @Query(() => CommentariesPaginated)
  async commentaries(
    @Arg('postId', () => ID) postId: string,
    @Arg('page', () => Int) page: number,
  ) {
    const commentaryCount = await CommentaryModel.count({ postId });

    const commentaries = await CommentaryModel.find({
      postId,
    })
      .skip(page === 1 ? 0 : page * 10)
      .limit(10)
      .populate('user');

    return {
      commentaries,
      currentPage: page,
      hasNextPage: page + 1 <= Math.ceil(commentaryCount / 10),
    };
  }

  @Mutation(() => Commentary)
  async comment(
    @Arg('userId', () => ID) userId: string,
    @Arg('postId', () => ID) postId: string,
    @Arg('body') body: string,
  ) {
    const user = await findUserById(userId);

    // TODO check if postId exists

    const commentary = await CommentaryModel.create({
      user,
      postId,
      body,
    });

    return commentary;
  }

  @Mutation(() => String)
  async deleteCommentary(@Arg('commentaryId') commentaryId: string) {
    const commentary = await CommentaryModel.findByIdAndDelete(commentaryId);

    if (!commentary) {
      throw new Error('Commentary not found');
    }

    return 'Deleted with success';
  }
}
