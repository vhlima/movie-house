import { Ctx, Arg, Mutation, Resolver } from 'type-graphql';

import type { ApolloServerContext } from '../../config/apollo-server-context';

import { LikeEntity } from '../../../infra/entities';

import { getLikeOrDislikeService } from '../../factories';

import { LikeType } from '../enums';

@Resolver(() => LikeEntity)
export class LikeResolver {
  @Mutation(() => Boolean)
  async likeOrDislike(
    @Ctx() { user }: ApolloServerContext,
    @Arg('contentId') contentId: string,
    @Arg('likeType', () => LikeType) likeType: LikeType,
  ) {
    const likeOrDislikeService = getLikeOrDislikeService();

    const likeResponse = await likeOrDislikeService.handle(
      contentId,
      likeType,
      user,
    );

    return likeResponse;
  }
}
