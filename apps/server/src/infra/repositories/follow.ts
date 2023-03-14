import { IFollowRepository } from '../../data/contracts';

import {
  PaginationInputModel,
  PaginationPreResponseModel,
} from '../../data/models';

import { Follow } from '../../domain/entities';

import { PostgresDataSource } from '../data-sources';

import { FollowEntity } from '../entities';

export class FollowRepository implements IFollowRepository {
  private getFollowRepository() {
    return PostgresDataSource.getRepository(FollowEntity);
  }

  async getUserFollowerCount(userId: string): Promise<number> {
    const followRepository = this.getFollowRepository();

    const followerCount = await followRepository.countBy({
      followedId: userId,
    });

    return followerCount;
  }

  async getUserFollowingCount(userId: string): Promise<number> {
    const followRepository = this.getFollowRepository();

    const followingCount = await followRepository.countBy({
      followerId: userId,
    });

    return followingCount;
  }

  async isFollowing(userId: string, followingId: string): Promise<boolean> {
    const followRepository = this.getFollowRepository();

    const follow = followRepository.findOneBy({
      followerId: userId,
      followedId: followingId,
    });

    return !!follow;
  }

  async createFollow(userId: string, followingId: string): Promise<boolean> {
    const followRepository = this.getFollowRepository();

    const follow = followRepository.create({
      followerId: userId,
      followedId: followingId,
    });

    await followRepository.save(follow);

    return true;
  }

  async deleteFollow(userId: string, followingId: string): Promise<boolean> {
    const followRepository = this.getFollowRepository();

    await followRepository.delete({
      followerId: userId,
      followedId: followingId,
    });

    return true;
  }

  async getUserFollowers(
    userId: string,
    { page, itemsPerPage }: PaginationInputModel<any>,
  ): Promise<PaginationPreResponseModel<Follow>> {
    const followRepository = this.getFollowRepository();

    const [followers, totalCount] = await followRepository.findAndCount({
      order: {
        createdAt: 'DESC',
      },
      where: {
        followedId: userId,
      },
      relations: ['follower'],
      take: itemsPerPage,
      skip: (page - 1) * itemsPerPage,
    });

    return {
      items: followers,
      itemsPerPage,
      totalCount,
      page,
    };
  }

  async getUserFollowings(
    userId: string,
    { page, itemsPerPage }: PaginationInputModel<any>,
  ): Promise<PaginationPreResponseModel<Follow>> {
    const followRepository = this.getFollowRepository();

    const [followings, totalCount] = await followRepository.findAndCount({
      order: {
        createdAt: 'DESC',
      },
      where: {
        followerId: userId,
      },
      relations: ['following'],
      take: itemsPerPage,
      skip: (page - 1) * itemsPerPage,
    });

    return {
      items: followings,
      itemsPerPage,
      totalCount,
      page,
    };
  }
}
