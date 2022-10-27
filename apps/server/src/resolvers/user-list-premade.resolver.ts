import { Resolver, Mutation, Ctx, Arg, Int, Query } from 'type-graphql';

import type { ServerContext } from '../types';

import {
  UserListPreMadeMovieRepository,
  UserRepository,
} from '../repositories';

import { findWithOffsetPagination } from './offset-pagination.resolver';

import UserListType from '../enums/UserListType';

import AlreadyExistsError from '../errors/AlreadyExists';

import UserListMovie from '../entities/mongo-entities/user-list/user-list-movie';

import UserListPremadeMovies from '../entities/offset-pagination/entities/user-list-premade-movies';

import UserListPreMadeMovie from '../entities/mongo-entities/user-list/premade/user-list-premade-movie';

import NotFoundError from '../errors/NotFound';

import AuthenticationError from '../errors/Authentication';
import UserNotFoundError from '../errors/UserNotFound';

const MAX_FAVORITE_MOVIES = 3;

// TODO bug adding favorite movie is not checking for limit

@Resolver()
export default class UserListPreMadeResolver {
  @Query(() => [UserListPreMadeMovie])
  async userFavoriteMovies(@Arg('userId') userId: string) {
    const user = await UserRepository.findOneBy({ id: userId });

    if (!user) {
      throw new UserNotFoundError();
    }

    const favoriteMovies = await UserListPreMadeMovieRepository.find({
      where: { userId, listType: UserListType.FAVORITE },
      take: MAX_FAVORITE_MOVIES,
    });

    return favoriteMovies;
  }

  @Query(() => UserListPremadeMovies)
  async userListPreMadeMovies(
    @Arg('userId') userId: string,
    @Arg('listType', () => UserListType) listType: UserListType,
    @Arg('first', () => Int) first: number,
    @Arg('offset', () => Int, { nullable: true }) offset?: number,
  ) {
    const paginationResult =
      await findWithOffsetPagination<UserListPreMadeMovie>({
        repository: UserListPreMadeMovieRepository,
        findOptions: { where: { userId, listType } },
        first,
        offset,
      });

    return paginationResult;
  }

  @Query(() => Boolean)
  async isMovieOnUserPreMadeList(
    @Ctx() { user }: ServerContext,
    @Arg('listType', () => UserListType)
    listType: UserListType,
    @Arg('movieId', () => Int) movieId: number,
  ) {
    if (!user) {
      throw new AuthenticationError();
    }

    const isMovieInList = await UserListPreMadeMovieRepository.findOneBy({
      userId: user.id,
      listType,
      movieId,
    });

    return !!isMovieInList;
  }

  @Mutation(() => UserListMovie)
  async addMovieToUserList(
    @Ctx() { user, dataSources }: ServerContext,
    @Arg('movieId', () => Int) movieId: number,
    @Arg('listType', () => UserListType)
    listType: UserListType,
  ) {
    if (!user) {
      throw new AuthenticationError();
    }

    const movieExistsInList = await UserListPreMadeMovieRepository.findOneBy({
      userId: user.id,
      listType,
      movieId,
    });

    if (movieExistsInList) {
      throw new AlreadyExistsError('This movie is already added to this list');
    }

    const movie = await dataSources.tmdb.getMovieById(movieId);

    if (!movie) {
      throw new NotFoundError('Movie not found');
    }

    const userListMovie = UserListPreMadeMovieRepository.create({
      userId: user.id,
      listType,
      movieId: movie.id,
      movie,
    });

    await UserListPreMadeMovieRepository.save(userListMovie);

    return userListMovie;
  }

  @Mutation(() => Boolean)
  async removeMovieFromList(
    @Ctx() { user }: ServerContext,
    @Arg('movieId', () => Int) movieId: number,
    @Arg('listType', () => UserListType)
    listType: UserListType,
  ) {
    if (!user) {
      throw new AuthenticationError();
    }

    const listMovieExists = await UserListPreMadeMovieRepository.findOneBy({
      userId: user.id,
      listType,
      movieId,
    });

    if (!listMovieExists) {
      throw new NotFoundError('This movie is not part of that list');
    }

    await UserListPreMadeMovieRepository.deleteOne({
      userId: user.id,
      listType,
      movieId,
    });

    return true;
  }
}
