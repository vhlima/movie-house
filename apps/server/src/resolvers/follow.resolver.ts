import { Arg, Args, Ctx, Int, Mutation, Query, Resolver } from 'type-graphql';

import { ApolloError } from 'apollo-server';

import type { ServerContext } from '../types';

import { findWithPagination } from './pagination.resolver';

import { FollowRepository, UserRepository } from '../repositories';

import Follow from '../entities/postgres/follow.interface';

import PaginationArgs from '../entities/types/args/pagination.args';

import Followers from '../entities/pagination/entities/follow.interface';

import UserNotFoundError from '../errors/UserNotFound';

import AuthenticationError from '../errors/Authentication';

@Resolver(() => Follow)
class FollowResolver {
  @Query(() => Followers)
  async followers(
    @Arg('userId') userId: string,
    @Args(() => PaginationArgs) { first, after }: PaginationArgs,
  ) {
    const user = await UserRepository.findOneBy({ id: userId });

    if (!user) {
      throw new UserNotFoundError();
    }

    const followers = await findWithPagination<Follow>({
      first,
      cursor: after,
      repository: FollowRepository,
      findOptions: { where: { userId }, relations: ['targetUser'] },
    });

    return followers;
  }

  @Query(() => Followers)
  async following(
    @Arg('userId') userId: string,
    @Args(() => PaginationArgs) { first, after }: PaginationArgs,
  ) {
    const user = await UserRepository.findOneBy({ id: userId });

    if (!user) {
      throw new UserNotFoundError();
    }

    const followers = await findWithPagination<Follow>({
      first,
      cursor: after,
      repository: FollowRepository,
      findOptions: {
        where: { targetUserId: userId },
        relations: ['targetUser'],
      },
    });

    return followers;
  }

  @Query(() => Boolean)
  async isFollowing(
    @Ctx() { user }: ServerContext,
    @Arg('userId') userId: string,
  ) {
    if (!user) {
      throw new AuthenticationError();
    }

    const targetUser = await UserRepository.findOneBy({ id: userId });

    if (!targetUser) {
      throw new UserNotFoundError();
    }

    const followExists = await FollowRepository.findOneBy({
      userId: user.id,
      targetUserId: targetUser.id,
    });

    return !!followExists;
  }

  @Mutation(() => Boolean)
  async follow(@Ctx() { user }: ServerContext, @Arg('userId') userId: string) {
    if (!user) {
      throw new AuthenticationError();
    }

    const targetUser = await UserRepository.findOneBy({ id: userId });

    if (!targetUser) {
      throw new UserNotFoundError();
    }

    const followExists = await FollowRepository.findOneBy({
      userId: user.id,
      targetUserId: targetUser.id,
    });

    if (followExists) {
      await FollowRepository.delete({
        userId: user.id,
        targetUserId: targetUser.id,
      });

      return false;
    }

    const follow = await FollowRepository.create({
      userId: user.id,
      targetUserId: targetUser.id,
    });

    await FollowRepository.save(follow);

    return true;
  }
}

export default FollowResolver;
