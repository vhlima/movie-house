import { Resolver, Mutation, Ctx, Arg, Int, Query } from 'type-graphql';

import type { ServerContext } from '../types';

import {
  UserRepository,
  UserListPremadeMovieRepository,
} from '../repositories';

import NotFoundError from '../errors/NotFound';

import UserNotFoundError from '../errors/UserNotFound';

import AuthenticationError from '../errors/Authentication';

import UserListType from '../enums/UserListType';

import UserListPremadeMovie from '../entities/mongo-entities/user-list-premade-movie.interface';

@Resolver(() => UserListPremadeMovie)
export default class UserListPreMadeResolver {
  async findSimpleList(userId: string, listType: UserListType) {
    const user = await UserRepository.findOneBy({ id: userId });

    if (!user) {
      throw new UserNotFoundError();
    }

    const listExists = await UserListPremadeMovieRepository.findBy({
      userId,
      listType: listType.toString(),
    });

    return listExists;
  }

  @Query(() => [UserListPremadeMovie])
  async watchlist(@Arg('userId') userId: string) {
    const listExists = await this.findSimpleList(
      userId,
      UserListType.WATCHLIST,
    );

    return listExists;
  }

  @Query(() => [UserListPremadeMovie])
  async watchlLater(@Arg('userId') userId: string) {
    const listExists = await this.findSimpleList(
      userId,
      UserListType.WATCH_LATER,
    );

    return listExists;
  }

  @Query(() => [UserListPremadeMovie])
  async watched(@Arg('userId') userId: string) {
    const listExists = await this.findSimpleList(userId, UserListType.WATCHED);

    return listExists;
  }

  @Mutation(() => UserListPremadeMovie)
  async addMovieToList(
    @Ctx() { user, dataSources }: ServerContext,
    @Arg('listType', () => UserListType) listType: UserListType,
    @Arg('movieId', () => Int) movieId: number,
  ) {
    if (!user) {
      throw new AuthenticationError();
    }

    const movie = await dataSources.tmdb.getMovieById(movieId);

    if (!movie) {
      throw new NotFoundError('Movie not found');
    }

    const userListMovie = UserListPremadeMovieRepository.create({
      userId: user.id,
      movieId: movie.id,
      listType,
      movie,
    });

    await UserListPremadeMovieRepository.save(userListMovie);

    return userListMovie;
  }

  @Mutation(() => String)
  async removeMovieFromList(
    @Ctx() { user }: ServerContext,
    @Arg('movieId', () => Int) movieId: number,
    @Arg('listType', () => UserListType) listType: UserListType,
  ) {
    if (!user) {
      throw new AuthenticationError();
    }

    const listMovieExists = await UserListPremadeMovieRepository.findOneBy({
      userId: user.id,
      listType,
      movieId,
    });

    if (!listMovieExists) {
      throw new NotFoundError('This movie is not part of that list');
    }

    await UserListPremadeMovieRepository.deleteOne({
      userId: user.id,
      listType,
      movieId,
    });

    return 'Removed with sucess';
  }
}
