import { Arg, Ctx, Query, Resolver } from 'type-graphql';

import { FollowRepository, UserRepository } from '../repositories';

import type { ServerContext } from '../types';

import UserProfile from '../entities/profile.interface';

import UserNotFoundError from '../errors/UserNotFound';

@Resolver(() => UserProfile)
class ProfileResolver {
  @Query(() => UserProfile)
  async userProfile(@Arg('userId') userId: string) {
    const targetUser = await UserRepository.findOneBy({ id: userId });

    if (!targetUser) {
      throw new UserNotFoundError();
    }

    const followerCount = await FollowRepository.countBy({
      targetUserId: userId,
    });

    const followingCount = await FollowRepository.countBy({
      userId,
    });

    return {
      followerCount,
      followingCount,

      listCount: 0,

      moviesWatchedCount: 0,
      moviesWatchedThisYearCount: 0,
    } as UserProfile;
  }
}

export default ProfileResolver;
