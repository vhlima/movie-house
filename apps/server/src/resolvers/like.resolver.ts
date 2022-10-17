import { Resolver, Mutation, Args, Ctx, Query, Arg } from 'type-graphql';

import type { ServerContext } from '../types';

import { LikeRepository, UserRepository } from '../repositories';

import Like from '../entities/mongo-entities/like.interface';

import LikeArgs from '../entities/types/args/like.args';

import UserNotFoundError from '../errors/UserNotFound';

import AuthenticationError from '../errors/Authentication';

@Resolver(() => Like)
export default class LikeResolver {
  @Query(() => Boolean)
  async hasUserLike(
    @Arg('userId') userId: string,
    @Args() { rootId, referenceId }: LikeArgs,
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
    @Args() { rootId, referenceId }: LikeArgs,
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
