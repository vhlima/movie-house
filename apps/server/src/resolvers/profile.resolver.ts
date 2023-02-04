import { Arg, Mutation, Query, Resolver } from 'type-graphql';

import {
  FollowRepository,
  ListMovieRepository,
  ListRepository,
  PreMadeListRepository,
  UserRepository,
} from '../repositories';

import { sortMongoDateFieldByYear } from '../utils/date-utils';

import PreMadeListType from '../enums/PreMadeListType';

import ProfileStats from '../objects/profile-stats';

import UserNotFoundError from '../errors/UserNotFound';

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

    const watchedMoviesList = await PreMadeListRepository.findOneBy({
      userId: user.id,
      listType: PreMadeListType.WATCHED,
    });

    let moviesWatchedThisYearCount = 0;

    if (watchedMoviesList) {
      const currentYear = new Date().getFullYear();

      moviesWatchedThisYearCount = await ListMovieRepository.countBy({
        listId: watchedMoviesList.id,
        createdAt: sortMongoDateFieldByYear(currentYear),
      });
    }

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
