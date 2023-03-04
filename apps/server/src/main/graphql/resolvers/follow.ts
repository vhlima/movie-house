import { Arg, Ctx, Int, Mutation, Query, Resolver } from 'type-graphql';

import { FollowEntity } from '../../../infra/entities';
import type { ApolloServerContext } from '../../config/apollo-server-context';
import {
  getCreateFollowService,
  getDeleteFollowService,
  getFindFollowService,
  getIsFollowingService,
} from '../../factories';
import { FollowPagination } from '../objects';

@Resolver(() => FollowEntity)
export class FollowResolver {
  @Query(() => FollowPagination)
  async followers(
    @Arg('userId') userId: string,
    @Arg('page', () => Int) page: number,
  ) {
    const findFollowsService = getFindFollowService();

    const followersResponse = await findFollowsService.handle(userId, { page });

    return followersResponse;
  }

  @Query(() => FollowPagination)
  async followings(
    @Arg('userId') userId: string,
    @Arg('page', () => Int) page: number,
  ) {
    const findFollowsService = getFindFollowService();

    const followingsResponse = await findFollowsService.handle(
      userId,
      { page },
      true,
    );

    return followingsResponse;
  }

  @Query(() => Boolean)
  async isFollowing(
    @Ctx() { user }: ApolloServerContext,
    @Arg('userId') userId: string,
  ) {
    const isFollowingService = getIsFollowingService();

    const isFollowingResponse = await isFollowingService.handle(userId, user);

    return isFollowingResponse;
  }

  @Mutation(() => Boolean)
  async follow(
    @Ctx() { user }: ApolloServerContext,
    @Arg('userId') userId: string,
  ) {
    const createFollowService = getCreateFollowService();

    const followResponse = await createFollowService.handle(userId, user);

    return followResponse;
  }

  @Mutation(() => Boolean)
  async unfollow(
    @Ctx() { user }: ApolloServerContext,
    @Arg('userId') userId: string,
  ) {
    const deleteFollowService = getDeleteFollowService();

    const unfollowResponse = await deleteFollowService.handle(userId, user);

    return unfollowResponse;
  }
}
