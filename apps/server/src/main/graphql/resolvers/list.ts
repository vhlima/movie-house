import { Arg, Ctx, Int, Mutation, Query, Resolver } from 'type-graphql';

import type { ApolloServerContext } from '../../config/apollo-server-context';

import { ListEntity, MovieEntity } from '../../../infra/entities';

import {
  getCreateListService,
  getAddMovieToListService,
  getRemoveMovieFromListService,
  getFindListService,
  getDeleteListService,
  getFindUserLists,
} from '../../factories';
import { ListSimple } from '../objects';

@Resolver(() => ListEntity)
export class ListResolver {
  @Query(() => ListEntity)
  async list(@Arg('listId') listId: string) {
    const findListService = getFindListService();

    const listResponse = await findListService.handle(listId);

    return listResponse;
  }

  @Query(() => [ListSimple])
  async userListNames(@Arg('userId') userId: string) {
    const findListService = getFindUserLists();

    const listResponse = await findListService.handle(userId);

    return listResponse.map(list => ({
      postId: list.postId,
      name: list.name,
    }));
  }

  @Mutation(() => ListEntity)
  async createList(
    @Ctx() { user }: ApolloServerContext,
    @Arg('listName') listName: string,
    @Arg('content', { nullable: true }) content?: string,
  ) {
    const createListService = getCreateListService();

    const listResponse = await createListService.handle(
      listName,
      content,
      user,
    );

    return listResponse;
  }

  @Mutation(() => Boolean)
  async deleteList(
    @Ctx() { user }: ApolloServerContext,
    @Arg('listId') listId: string,
  ) {
    const deleteListService = getDeleteListService();

    const listResponse = await deleteListService.handle(listId, user);

    return listResponse;
  }

  @Mutation(() => MovieEntity)
  async addMovieToList(
    @Ctx() { user }: ApolloServerContext,
    @Arg('listId') listId: string,
    @Arg('movieId', () => Int) movieId: number,
  ) {
    const addMovieToListService = getAddMovieToListService();

    const movieResponse = await addMovieToListService.handle(
      listId,
      movieId,
      user,
    );

    return movieResponse.movie;
  }

  @Mutation(() => Boolean)
  async removeMovieFromList(
    @Ctx() { user }: ApolloServerContext,
    @Arg('listId') listId: string,
    @Arg('movieId', () => Int) movieId: number,
  ) {
    const removeMovieFromList = getRemoveMovieFromListService();

    const movieResponse = await removeMovieFromList.handle(
      listId,
      movieId,
      user,
    );

    return movieResponse;
  }
}
