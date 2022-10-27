import { Arg, Query, Resolver } from 'type-graphql';

import {
  FollowRepository,
  ReviewRepository,
  UserListCustomRepository,
  UserListPreMadeMovieRepository,
  UserRepository,
} from '../repositories';

import UserNotFoundError from '../errors/UserNotFound';

import ProfileStats from '../entities/user-profile/profile-stats.interface';

import ProfileReviews from '../entities/user-profile/profile-reviews.interface';
import UserListType from '../enums/UserListType';

const MAX_FEATURED_REVIEWS = 3;

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

    const listCount = await UserListCustomRepository.countBy({
      authorId: user.id,
    });

    const moviesWatchedCount = await UserListPreMadeMovieRepository.count({
      where: { userId: user.id, listType: UserListType.WATCHED },
    });

    return {
      followerCount,
      followingCount,
      listCount,

      moviesWatchedCount,
      moviesWatchedThisYearCount: 0,
    };
  }

  @Query(() => ProfileReviews)
  async userProfileFeaturedReviews(@Arg('userId') userId: string) {
    const user = await UserRepository.findOneBy({ id: userId });

    if (!user) {
      throw new UserNotFoundError();
    }

    const recentReviews = await ReviewRepository.find({
      where: { authorId: user.id },
      order: { createdAt: 'DESC' },
      take: MAX_FEATURED_REVIEWS,
    });

    const pinnedReviews = await ReviewRepository.find({
      where: {
        authorId: user.id,
        pinned: true,
      },
      take: MAX_FEATURED_REVIEWS,
    });

    const popularReviews = await ReviewRepository.find({
      where: { authorId: user.id },
      take: MAX_FEATURED_REVIEWS,
    });

    return {
      recentReviews,
      pinnedReviews,
      popularReviews,
    };
  }
}

export default ProfileResolver;
