import { Resolver, Arg, Query, Int, Ctx } from 'type-graphql';

import { Any } from 'typeorm';
import type { ServerContext } from '../types';

import {
  ListMovieRepository,
  ListRepository,
  PreMadeListRepository,
  UserRepository,
} from '../repositories';

import NotFoundError from '../errors/NotFound';

import UserNotFoundError from '../errors/UserNotFound';

import PreMadeListType from '../enums/PreMadeListType';

import ListMovie from '../entities/mongo-entities/list-movie';

import AuthenticationError from '../errors/Authentication';

@Resolver()
export default class UserListResolver {
  @Query(() => [ListMovie])
  async userListMovies(
    @Arg('listId') listId: string,
    @Arg('page', () => Int, { nullable: true }) page = 1,
  ) {
    const listExists = await ListRepository.findOneBy({ id: listId });

    if (!listExists) {
      throw new NotFoundError('List not found');
    }

    const listMovies = await ListMovieRepository.findBy({
      listId: listExists.id,
    });

    return listMovies;
  }

  @Query(() => [ListMovie])
  async userPreMadeListMovies(
    @Arg('userId') userId: string,
    @Arg('listType', () => PreMadeListType) listType: PreMadeListType,
    @Arg('page', () => Int, { nullable: true }) page = 1,
  ) {
    const user = await UserRepository.findOneBy({ id: userId });

    if (!user) {
      throw new UserNotFoundError();
    }

    const listExists = await PreMadeListRepository.findOneBy({ listType });

    if (!listExists) {
      return [];
    }

    const listMovies = await ListMovieRepository.findBy({
      listId: listExists.id,
    });

    return listMovies;
  }

  @Query(() => Boolean)
  async isMovieOnPreMadeList(
    @Ctx() { user }: ServerContext,
    @Arg('movieId', () => Int) movieId: number,
    @Arg('listType', () => PreMadeListType) listType: PreMadeListType,
  ) {
    if (!user) {
      throw new AuthenticationError();
    }

    const listTypeFound = await PreMadeListRepository.findOne({
      where: { userId: user.id, listType },
    });

    if (!listTypeFound) {
      return false;
    }

    const movieFound = await ListMovieRepository.findOneBy({
      listId: listTypeFound.id,
      movieId,
    });

    return !!movieFound;
  }

  @Query(() => Boolean)
  async isMovieOnList(
    @Ctx() { user }: ServerContext,
    @Arg('postId', () => Int) postId: number,
  ) {
    if (!user) {
      throw new AuthenticationError();
    }

    const listTypeFound = await ListRepository.findOne({
      where: { post: { id: postId, userId: user.id } },
      relations: ['post'],
    });

    if (!listTypeFound) {
      return false;
    }

    const movieFound = await ListMovieRepository.findOneBy({
      listId: listTypeFound.id,
    });

    return !!movieFound;
  }

  @Query(() => [ListMovie])
  async userPreMadeListMoviesByGenre(
    @Arg('userId') userId: string,
    @Arg('genres', () => [Int]) genres: number[],
    @Arg('listType', () => PreMadeListType) listType: PreMadeListType,
  ) {
    const user = await UserRepository.findOneBy({ id: userId });

    if (!user) {
      throw new UserNotFoundError();
    }

    const listExists = await PreMadeListRepository.findOneBy({
      listType,
    });

    if (!listExists) {
      return [];
    }

    const listMovies = await ListMovieRepository.findBy({
      listId: listExists.id,
      'movie.genres': {
        $elemMatch: { id: { $in: genres } },
      },
    });

    return listMovies;
  }
}
