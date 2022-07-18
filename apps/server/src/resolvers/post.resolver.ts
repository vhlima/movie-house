import { FieldResolver, Root, Resolver, Int } from 'type-graphql';

import Post from '../entities/post.interface';

import Commentary from '../entities/commentary/commentary.interface';

import { CommentaryModel, LikeModel } from '../models';

export const createPostResolver = <T extends Post>() => {
  @Resolver(() => Post, { isAbstract: true })
  abstract class PostResolver {
    @FieldResolver(() => Int)
    async likeCount(@Root('_doc') post: T) {
      const likes = await LikeModel.find({ postId: post._id });

      return likes.length;
    }

    @FieldResolver(() => [Commentary])
    async commentaries(@Root('_doc') post: T) {
      const rootCommentaries = await CommentaryModel.find({
        postId: post._id,
      }).populate('user');

      return rootCommentaries;
    }
  }

  return PostResolver;
};
