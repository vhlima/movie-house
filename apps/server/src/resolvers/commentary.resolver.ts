import {
  Resolver,
  Query,
  Mutation,
  Args,
  Arg,
  ResolverInterface,
  FieldResolver,
  Root,
  Int,
} from 'type-graphql';
import { findUserById } from '../controllers/user.controller';

import Commentary from '../entities/commentary.interface';

import CommentaryArgs from '../entities/types/args/commentary.args';

import CommentaryType from '../enum/commentary.enum';

import { CommentaryModel, LikeModel } from '../models';

@Resolver(() => Commentary)
export default class CommentaryResolver
  implements ResolverInterface<Commentary>
{
  // TODO really dont know how to find root object without specifiyng _doc

  @FieldResolver(() => Int)
  async likeCount(@Root('_doc') commentary: Commentary) {
    const likes = await LikeModel.find({ referenceId: commentary._id });

    return likes.length;
  }

  @FieldResolver(() => Int)
  async repliesCount(@Root('_doc') commentary: Commentary) {
    if (commentary.commentaryType === CommentaryType.REPLY) return 0;

    const replies = await CommentaryModel.find({
      commentaryType: CommentaryType.REPLY,
      referenceId: commentary,
    });

    return replies.length;
  }

  @Query(() => [Commentary])
  async commentaries(@Arg('referenceId') referenceId: string) {
    const commentaries = await CommentaryModel.find({ referenceId }).populate(
      'user',
    );

    return commentaries;
  }

  @Mutation(() => Commentary)
  async comment(@Args() { userId, referenceId, body }: CommentaryArgs) {
    const user = await findUserById(userId);

    const commentary = await CommentaryModel.create({
      commentaryType: CommentaryType.ROOT,
      user,
      referenceId,
      body,
    });

    return commentary;
  }

  @Mutation(() => Commentary)
  async reply(@Args() { userId, referenceId, body }: CommentaryArgs) {
    const commentary = await CommentaryModel.create({
      commentaryType: CommentaryType.REPLY,
      user: userId,
      referenceId,
      body,
    });

    return commentary;
  }
}
