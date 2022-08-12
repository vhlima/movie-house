import {
  Resolver,
  Mutation,
  Ctx,
  Arg,
  Int,
  Query,
  ID,
  ClassType,
} from 'type-graphql';

import { MongoRepository } from 'typeorm';

import type { ServerContext } from '../types';

import { UserRepository } from '../repositories';

import MovieList from '../entities/mongo/movieList.interface';

import NotFoundError from '../errors/NotFound';

import UserNotFoundError from '../errors/UserNotFound';

import AlreadyExistsError from '../errors/AlreadyExists';

import AuthenticationError from '../errors/Authentication';

interface MovieListResolverProps {
  findName: string;
  findOneName: string;
  addName: string;
  removeName: string;
}

export const createMovieListResolver = <T extends MovieList>(
  listClass: () => ClassType<T>,
  repository: MongoRepository<T>,
  { findOneName, findName, addName, removeName }: MovieListResolverProps,
) => {
  const ListClass = listClass();

  @Resolver(() => MovieList, { isAbstract: true })
  abstract class MovieListResolver {
    @Query(() => ListClass, { name: findOneName, nullable: true })
    async findOne(
      @Arg('userId') userId: string,
      @Arg('movieId', () => Int) movieId: number,
    ) {
      const user = await UserRepository.findOneBy({ id: userId });

      if (!user) {
        throw new UserNotFoundError();
      }

      const favoriteMovie = await repository.findOneBy({
        userId: user.id,
        movieId,
      });

      return favoriteMovie;
    }

    @Query(() => [ListClass], { name: findName })
    async find(@Arg('userId', () => ID) userId: string) {
      const user = await UserRepository.findOneBy({ id: userId });

      if (!user) {
        throw new UserNotFoundError();
      }

      const favoriteMovies = await repository.findBy({ userId });

      return favoriteMovies;
    }

    @Mutation(() => ListClass, { name: addName })
    async add(
      @Ctx() { user, dataSources }: ServerContext,
      @Arg('movieId', () => Int) movieId: number,
    ) {
      if (!user) {
        throw new AuthenticationError();
      }

      const favoriteMovieExists = await repository.findOneBy({
        userId: user.id,
        movieId,
      });

      if (favoriteMovieExists) {
        throw new AlreadyExistsError(
          'You already have this movie added to your list',
        );
      }

      const movie = await dataSources.tmdb.getMovieById(movieId);

      if (!movie) {
        throw new NotFoundError('Movie not found');
      }

      const favoriteMovie = repository.create({
        userId: user.id,
        movieId: movie.id,
        movie,
      } as any);

      await repository.save(favoriteMovie);

      return favoriteMovie;
    }

    @Mutation(() => String, { name: removeName })
    async remove(
      @Ctx() { user }: ServerContext,
      @Arg('movieId', () => Int) movieId: number,
    ) {
      if (!user) {
        throw new AuthenticationError();
      }

      const favoriteMovieExists = await repository.findOneBy({
        userId: user.id,
        movieId,
      });

      if (!favoriteMovieExists) {
        throw new AlreadyExistsError('You dont have this movie in your list');
      }

      await repository.delete({ userId: user.id, movieId } as any);

      return 'Removed with sucess';
    }
  }

  return MovieListResolver;
};
