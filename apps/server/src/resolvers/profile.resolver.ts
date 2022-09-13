import { Arg, Ctx, Int, Mutation, Query, Resolver } from 'type-graphql';

import { ObjectId } from 'mongodb';

import { ApolloError } from 'apollo-server';

import {
  FollowRepository,
  ReviewRepository,
  UserRepository,
} from '../repositories';

import type { ServerContext } from '../types';

import UserProfile from '../entities/profile.interface';

import Review from '../entities/mongo/review.interface';

import FeaturedReviews from '../entities/featuredReviews.interface';

import NotFoundError from '../errors/NotFound';
import UserNotFoundError from '../errors/UserNotFound';
import AuthorizationError from '../errors/Authorization';
import AuthenticationError from '../errors/Authentication';

const MAX_LATEST_REVIEWS = 3;

const MAX_POPULAR_REVIEWS = 3;

const MAX_PINNED_REVIEWS = 3;

@Resolver(() => UserProfile)
class ProfileResolver {
  @Query(() => Int)
  async followerCount(@Arg('userId') userId: string) {
    const count = await FollowRepository.countBy({
      targetUserId: userId,
    });

    return count;
  }

  @Query(() => Int)
  async followingCount(@Arg('userId') userId: string) {
    const count = await FollowRepository.countBy({
      userId,
    });

    return count;
  }

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

  @Mutation(() => Review)
  async pinReview(
    @Ctx() { user }: ServerContext,
    @Arg('reviewId') reviewId: string,
  ) {
    if (!user) {
      throw new AuthenticationError();
    }

    const review = await ReviewRepository.findOneBy(reviewId);

    if (!review) {
      throw new NotFoundError('Review not found');
    }

    if (review.authorId !== user.id) {
      throw new AuthorizationError();
    }

    if (!review.pinned) {
      const pinnedReviews = await ReviewRepository.findBy({
        authorId: user.id,
        pinned: true,
      });

      if (pinnedReviews.length >= MAX_PINNED_REVIEWS) {
        throw new ApolloError(
          `You have reached the limit of ${MAX_PINNED_REVIEWS} pinned reviews`,
        );
      }

      review.pinned = true;

      await ReviewRepository.save(review);
    } else {
      await ReviewRepository.updateOne(
        {
          _id: new ObjectId(reviewId),
        },
        { $unset: { pinned: null } },
      );

      delete review.pinned;
    }

    return review;
  }

  @Query(() => [Review])
  async pinnedReviews(@Arg('userId') userId: string) {
    const user = await UserRepository.findOneBy({ id: userId });

    if (!user) {
      throw new UserNotFoundError();
    }

    const reviews = await ReviewRepository.findBy({
      authorId: userId,
      pinned: true,
    });

    return reviews;
  }

  @Query(() => [Review])
  async popularReviews(@Arg('userId') userId: string) {
    const user = await UserRepository.findOneBy({ id: userId });

    if (!user) {
      throw new UserNotFoundError();
    }

    const reviews = await ReviewRepository.find({
      where: { authorId: userId },
    });

    return reviews;
  }

  @Query(() => [Review])
  async recentReviews(@Arg('userId') userId: string) {
    const user = await UserRepository.findOneBy({ id: userId });

    if (!user) {
      throw new UserNotFoundError();
    }

    const reviews = await ReviewRepository.find({
      where: { authorId: userId },
      order: { createdAt: 'DESC' },
      take: MAX_LATEST_REVIEWS,
    });

    return reviews;
  }

  @Query(() => FeaturedReviews)
  async featuredReviews(@Arg('userId') userId: string) {
    const user = await UserRepository.findOneBy({ id: userId });

    if (!user) {
      throw new UserNotFoundError();
    }

    const reviews = await ReviewRepository.findBy({ authorId: userId });

    reviews.forEach(review => {
      /* eslint-disable no-param-reassign */
      review.likes = [];
    });

    return {
      pinnedReviews: reviews.filter(review => review.pinned),
      popularReviews: reviews
        .sort((r1, r2) => r1.likes.length - r2.likes.length)
        .slice(0, MAX_POPULAR_REVIEWS + 1),
      recentReviews: reviews
        .sort((r1, r2) => r2.createdAt.getTime() - r1.createdAt.getTime())
        .slice(0, MAX_LATEST_REVIEWS + 1),
    } as FeaturedReviews;
  }
}

export default ProfileResolver;
