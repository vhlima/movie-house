import { Arg, Ctx, Int, Mutation, Query, Resolver } from 'type-graphql';

import { MovieEntity, PreMadeListEntity } from '../../../infra/entities';

import { ApolloServerContext } from '../../config/apollo-server-context';

import {
  getAddMovieToPreMadeListService,
  getIsMovieOnPreMadeListService,
  getRemoveMovieFromPreMadeListService,
} from '../../factories';

import { PreMadeListType } from '../enums';

@Resolver(() => PreMadeListEntity)
export class PreMadeListResolver {
  @Query(() => Boolean)
  async isMovieOnPreMadeList(
    @Ctx() { user }: ApolloServerContext,
    @Arg('listType', () => PreMadeListType) listType: PreMadeListType,
    @Arg('movieId', () => Int) movieId: number,
  ) {
    const movieOnPreMadeListService = getIsMovieOnPreMadeListService();

    const isMovieOnPreMadeList = await movieOnPreMadeListService.handle(
      listType,
      movieId,
      user,
    );

    return isMovieOnPreMadeList;
  }

  @Mutation(() => MovieEntity)
  async addMovieToPreMadeList(
    @Ctx() { user }: ApolloServerContext,
    @Arg('listType', () => PreMadeListType) listType: PreMadeListType,
    @Arg('movieId', () => Int) movieId: number,
  ) {
    const addMovieToPreMadeListService = getAddMovieToPreMadeListService();

    const movieResponse = await addMovieToPreMadeListService.handle(
      listType,
      movieId,
      user,
    );

    return movieResponse.movie;
  }

  @Mutation(() => Boolean)
  async removeMovieFromPreMadeList(
    @Ctx() { user }: ApolloServerContext,
    @Arg('listType', () => PreMadeListType) listType: PreMadeListType,
    @Arg('movieId', () => Int) movieId: number,
  ) {
    const removeMovieFromPreMadeListService =
      getRemoveMovieFromPreMadeListService();

    const movieResponse = await removeMovieFromPreMadeListService.handle(
      listType,
      movieId,
      user,
    );

    return movieResponse;
  }
}
