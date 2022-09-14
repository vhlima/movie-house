import { Resolver, Mutation, Args, Ctx } from 'type-graphql';

import type { ServerContext } from '../types';

import { LikeRepository } from '../repositories';

import Like from '../entities/mongo-entities/like.interface';

import LikeArgs from '../entities/types/args/like.args';

import AuthenticationError from '../errors/Authentication';

@Resolver(() => Like)
export default class LikeResolver {
  @Mutation(() => Boolean)
  async like(
    @Ctx() { user }: ServerContext,
    @Args() { rootId, referenceId }: LikeArgs,
  ) {
    if (!user) {
      throw new AuthenticationError();
    }

    const likeExists = await LikeRepository.findOneBy({ rootId, referenceId });

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
