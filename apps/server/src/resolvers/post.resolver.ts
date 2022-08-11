import {
  FieldResolver,
  Root,
  Resolver,
  Int,
  ResolverInterface,
} from 'type-graphql';

import { LikeRepository, UserRepository } from '../repositories';

import Post from '../entities/mongo/post.interface';

import User from '../entities/postgres/user.interface';

import UserNotFoundError from '../errors/UserNotFound';

export const createPostResolver = () => {
  @Resolver(() => Post, { isAbstract: true })
  abstract class PostResolver implements ResolverInterface<Post> {
    @FieldResolver(() => User)
    async author(@Root() post: Post) {
      const user = await UserRepository.findOne({
        where: { id: post.authorId },
      });

      if (!user) {
        throw new UserNotFoundError();
      }

      return user;
    }

    @FieldResolver(() => Int)
    async likeCount(@Root() post: Post) {
      const count = await LikeRepository.count({
        where: { id: post.id },
      });

      return count;
    }

    @FieldResolver(() => Int)
    async commentaryCount(@Root() post: Post) {
      const count = await LikeRepository.count({
        where: { id: post.id },
      });

      return count;
    }
  }

  return PostResolver;
};
