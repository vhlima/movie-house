import { Resolver, Mutation, Ctx, Arg, Int, Query, Args } from 'type-graphql';

import { ObjectId } from 'mongodb';

import type { ServerContext } from '../types';

import {
  UserListCustomRepository,
  UserListCustomMovieRepository,
  UserRepository,
} from '../repositories';

import NotFoundError from '../errors/NotFound';

import UserNotFoundError from '../errors/UserNotFound';

import AuthenticationError from '../errors/Authentication';

import UserListCustomMovie from '../entities/mongo-entities/user-list-custom-movie.interface';

import UserListCustom from '../entities/mongo-entities/user-list-custom.interface';

import AlreadyExistsError from '../errors/AlreadyExists';

@Resolver(() => UserListCustom)
export default class UserListResolver {
  @Query(() => [UserListCustom])
  async userLists(@Arg('userId') userId: string) {
    const user = await UserRepository.findOneBy({ id: userId });

    if (!user) {
      throw new UserNotFoundError();
    }

    const lists = await UserListCustomRepository.findBy({
      authorId: userId,
    });

    return lists;
  }

  @Query(() => UserListCustom)
  async userList(@Arg('userId') userId: string, @Arg('listId') listId: string) {
    const user = await UserRepository.findOneBy({ id: userId });

    if (!user) {
      throw new UserNotFoundError();
    }

    const listExists = await UserListCustomRepository.findOneBy({
      _id: new ObjectId(listId),
      authorId: userId,
    });

    if (!listExists) {
      throw new NotFoundError('List not found');
    }

    return listExists;
  }

  @Mutation(() => UserListCustom)
  async createUserList(
    @Ctx() { user }: ServerContext,
    @Arg('name') name: string,
    @Arg('body') body?: string,
  ) {
    if (!user) {
      throw new AuthenticationError();
    }

    const userListExists = await UserListCustomRepository.findOneBy({
      authorId: user.id,
      name,
    });

    if (userListExists) {
      throw new AlreadyExistsError('You already have a list with that name');
    }

    const userList = UserListCustomRepository.create({
      authorId: user.id,
      name,
      body: body || '',
    });

    await UserListCustomRepository.save(userList);

    return userList;
  }

  @Mutation(() => UserListCustomMovie)
  async addMovieToCustomList(
    @Ctx() { user, dataSources }: ServerContext,
    @Arg('listId') listId: string,
    @Arg('movieId', () => Int) movieId: number,
  ) {
    if (!user) {
      throw new AuthenticationError();
    }

    const listExists = await UserListCustomRepository.findOneBy({
      _id: new ObjectId(listId),
      authorId: user.id,
    });

    if (!listExists) {
      throw new NotFoundError('List not found');
    }

    const movieAlreadyAdded = await UserListCustomMovieRepository.findOneBy({
      listId: listExists.id,
      movieId,
    });

    if (movieAlreadyAdded) {
      throw new AlreadyExistsError('This movie is already added to that list');
    }

    const movie = await dataSources.tmdb.getMovieById(movieId);

    if (!movie) {
      throw new NotFoundError('Movie not found');
    }

    const userListMovie = UserListCustomMovieRepository.create({
      listId: listExists.id,
      movieId: movie.id,
      movie,
    });

    await UserListCustomMovieRepository.save(userListMovie);

    return userListMovie;
  }

  @Mutation(() => String)
  async removeMovieFromCustomList(
    @Ctx() { user }: ServerContext,
    @Arg('listId') listId: string,
    @Arg('movieId', () => Int) movieId: number,
  ) {
    if (!user) {
      throw new AuthenticationError();
    }

    const listExists = await UserListCustomRepository.findOneBy({
      _id: new ObjectId(listId),
      authorId: user.id,
    });

    if (!listExists) {
      throw new NotFoundError('List not found');
    }

    const listMovieExists = await UserListCustomMovieRepository.findOneBy({
      listId: listExists.id,
      userId: user.id,
      movieId,
    });

    if (!listMovieExists) {
      throw new NotFoundError('This movie is not part of that list');
    }

    await UserListCustomMovieRepository.deleteOne({
      listId: listExists.id,
      userId: user.id,
      movieId,
    });

    return 'Removed with sucess';
  }
}
