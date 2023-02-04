import { Resolver, Mutation, Args, Ctx, Query, Arg } from 'type-graphql';

import type { ServerContext } from '../types';

import { LikeRepository, UserRepository } from '../repositories';

import Like from '../entities/mongo-entities/like.interface';

import UserNotFoundError from '../errors/UserNotFound';

import AuthenticationError from '../errors/Authentication';

@Resolver(() => Like)
export default class LikeResolver {
  @Query(() => Boolean)
  async hasUserLike(
    @Arg('userId') userId: string,
    @Arg('rootId') rootId: string,
    @Arg('referenceId', { nullable: true }) referenceId?: string,
  ) {
    const user = await UserRepository.findOneBy({ id: userId });

    if (!user) {
      throw new UserNotFoundError();
    }

    const likeExists = await LikeRepository.findOneBy({
      userId,
      rootId,
      referenceId,
    });

    return !!likeExists;
  }

  @Mutation(() => Boolean)
  async like(
    @Ctx() { user }: ServerContext,
    @Arg('rootId') rootId: string,
    @Arg('referenceId', { nullable: true }) referenceId?: string,
  ) {
    if (!user) {
      throw new AuthenticationError();
    }

    const likeExists = await LikeRepository.findOneBy({
      userId: user.id,
      rootId,
      referenceId,
    });

    if (likeExists) {
      await LikeRepository.delete({ userId: user.id, rootId, referenceId });
      return false;
    }

    const like = LikeRepository.create({
      userId: user.id,
      rootId,
      referenceId,
    });

    await LikeRepository.save(like);

    return true;
  }
}
