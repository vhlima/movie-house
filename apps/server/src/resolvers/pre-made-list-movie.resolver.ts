import { Resolver, Arg, Query, Int, Ctx, Args } from 'type-graphql';

import type { ServerContext } from '../types';

import {
  ListMovieRepository,
  PreMadeListRepository,
  UserRepository,
} from '../repositories';

import {
  sortMovieListByDecade,
  sortMovieListByGenre,
  sortMovieListByYear,
} from '../controllers/movie-sort.controller';

import Movie from '../entities/mongo-entities/movie';

import PreMadeListType from '../enums/PreMadeListType';

import UserNotFoundError from '../errors/UserNotFound';
import AuthenticationError from '../errors/Authentication';

import MovieSortType from '../enums/MovieSortType';
import MovieSortArgs from '../entities/types/movie-sort.args';

@Resolver()
export default class PreMadeListMovieResolver {
  async findMoviesFromList(
    userId: string,
    listType: PreMadeListType,
    page: number,
    sort?: Record<string, unknown>,
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
      ...sort,
    });

    return listMovies.map(listMovie => listMovie.movie);
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

  @Query(() => [Movie])
  async userPreMadeListMovies(
    @Arg('userId') userId: string,
    @Arg('listType', () => PreMadeListType) listType: PreMadeListType,
    @Arg('sort', { nullable: true }) sort?: MovieSortArgs,
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

    let sortObject: Record<string, unknown> | undefined;

    if (sort) {
      switch (sort.type) {
        case MovieSortType.GENRE: {
          sortObject = sortMovieListByGenre(sort.filter as number[]);
          break;
        }

        case MovieSortType.DECADE: {
          sortObject = sortMovieListByDecade(sort.filter as string);
          break;
        }

        case MovieSortType.YEAR: {
          sortObject = sortMovieListByYear(sort.filter as number);
          break;
        }

        default: {
          break;
        }
      }
    }

    const listMovies = await ListMovieRepository.findBy({
      listId: listExists.id,
      ...sortObject,
    });

    return listMovies.map(listMovie => listMovie.movie);
  }
}
