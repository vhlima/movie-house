import { Resolver, Mutation, Ctx, Arg, Int, Query } from 'type-graphql';

import { ObjectId } from 'mongodb';

import type { ServerContext } from '../types';

import {
  UserRepository,
  UserListCustomRepository,
  UserListCustomMovieRepository,
} from '../repositories';

import { findWithOffsetPagination } from './offset-pagination.resolver';

import UserListCustom from '../entities/mongo-entities/user-list/custom/user-list-custom';

import UserListCustomMovies from '../entities/offset-pagination/entities/user-list-custom-movies';

import UserListCustomMovie from '../entities/mongo-entities/user-list/custom/user-list-custom-movie';

import NotFoundError from '../errors/NotFound';

import UserNotFoundError from '../errors/UserNotFound';

import AuthenticationError from '../errors/Authentication';

import AlreadyExistsError from '../errors/AlreadyExists';

@Resolver(() => UserListCustom)
export default class UserListCustomResolver {
  @Query(() => UserListCustomMovies)
  async userListCustomMovies(
    @Arg('listId') listId: string,
    @Arg('first', () => Int) first: number,
    @Arg('offset', () => Int) offset: number,
  ) {
    const paginationResult =
      await findWithOffsetPagination<UserListCustomMovie>({
        repository: UserListCustomMovieRepository,
        findOptions: { where: { listId } },
        first,
        offset,
      });

    return paginationResult;
  }

  @Query(() => UserListCustom)
  async userListCustom(
    @Arg('userId') userId: string,
    @Arg('listId') listId: string,
  ) {
    const user = await UserRepository.findOneBy({ id: userId });

    if (!user) {
      throw new UserNotFoundError();
    }

    const userListFound = await UserListCustomRepository.findOneBy({
      _id: new ObjectId(listId),
    });

    if (!userListFound) {
      throw new NotFoundError('List not found');
    }

    return userListFound;
  }

  @Mutation(() => UserListCustom)
  async createUserList(
    @Ctx() { user }: ServerContext,
    @Arg('name') name: string,
    @Arg('body') body: string,
  ) {
    if (!user) {
      throw new AuthenticationError();
    }

    const userListExists = await UserListCustomRepository.findOneBy({ name });

    if (!userListExists) {
      throw new AlreadyExistsError('You already have a list with this name');
    }

    const userList = UserListCustomRepository.create({
      authorId: user.id,
      name,
      body,
    });
    return userList;
  }

  @Query(() => Boolean)
  async isMovieOnUserCustomList(
    @Ctx() { user }: ServerContext,
    @Arg('listId') listId: string,
    @Arg('movieId', () => Int) movieId: number,
  ) {
    if (!user) {
      throw new AuthenticationError();
    }

    const listIdAsObject = new ObjectId(listId);

    const listExists = await UserListCustomRepository.findOneBy({
      _id: listIdAsObject,
    });

    if (!listExists) {
      throw new NotFoundError('List not found');
    }

    const isMovieInList = await UserListCustomMovieRepository.findOneBy({
      listId: listIdAsObject,
      movieId,
    });

    return !!isMovieInList;
  }

  @Mutation(() => UserListCustomMovie)
  async addMovieToUserCustomList(
    @Ctx() { user, dataSources }: ServerContext,
    @Arg('listId') listId: string,
    @Arg('movieId', () => Int) movieId: number,
  ) {
    if (!user) {
      throw new AuthenticationError();
    }

    const listIdAsObject = new ObjectId(listId);

    const listExists = await UserListCustomRepository.findOneBy({
      _id: listIdAsObject,
    });

    if (!listExists) {
      throw new NotFoundError('List not found');
    }

    const movieExistsInList = await UserListCustomMovieRepository.findOneBy({
      listId: listIdAsObject,
      userId: user.id,
      movieId,
    });

    if (movieExistsInList) {
      throw new AlreadyExistsError('This movie is already added to this list');
    }

    const movie = await dataSources.tmdb.getMovieById(movieId);

    if (!movie) {
      throw new NotFoundError('Movie not found');
    }

    const userListMovie = UserListCustomMovieRepository.create({
      listId: listIdAsObject,
      movieId: movie.id,
      movie,
    });

    await UserListCustomMovieRepository.save(userListMovie);

    return userListMovie;
  }

  @Mutation(() => Boolean)
  async removeMovieFromCustomList(
    @Ctx() { user }: ServerContext,
    @Arg('listId') listId: string,
    @Arg('movieId', () => Int) movieId: number,
  ) {
    if (!user) {
      throw new AuthenticationError();
    }

    const listIdAsObject = new ObjectId(listId);

    const listExists = await UserListCustomRepository.findOneBy({
      _id: listIdAsObject,
    });

    if (!listExists) {
      throw new NotFoundError('List not found');
    }

    const listMovieExists = await UserListCustomRepository.findOneBy({
      listId: listIdAsObject,
      userId: user.id,
      movieId,
    });

    if (!listMovieExists) {
      throw new NotFoundError('This movie is not part of that list');
    }

    await UserListCustomRepository.deleteOne({
      listId: listIdAsObject,
      userId: user.id,
      movieId,
    });

    return true;
  }
}
