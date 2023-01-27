import { Arg, Query, Resolver } from 'type-graphql';

import {
  FollowRepository,
  ListRepository,
  PreMadeListRepository,
  UserRepository,
} from '../repositories';

import UserNotFoundError from '../errors/UserNotFound';

import ProfileStats from '../entities/profile-stats';

import PreMadeListType from '../enums/PreMadeListType';

@Resolver()
class ProfileResolver {
  @Query(() => ProfileStats)
  async userProfileStats(@Arg('userId') userId: string) {
    const user = await UserRepository.findOneBy({ id: userId });

    if (!user) {
      throw new UserNotFoundError();
    }

    const followerCount = await FollowRepository.countBy({
      targetUserId: user.id,
    });

    const followingCount = await FollowRepository.countBy({
      userId: user.id,
    });

    const listCount = await ListRepository.count({
      where: {
        post: { userId: user.id },
      },
      relations: ['post'],
    });

    const moviesWatchedCount = await PreMadeListRepository.count({
      where: { userId: user.id, listType: PreMadeListType.WATCHED },
    });

    const moviesWatchedThisYearCount = await PreMadeListRepository.count({
      // TODO order query by only movies watched the current year
      where: { userId: user.id, listType: PreMadeListType.WATCHED },
    });

    return {
      followerCount,
      followingCount,
      listCount,

      moviesWatchedCount,
      moviesWatchedThisYearCount,
    };
  }
}

export default ProfileResolver;
