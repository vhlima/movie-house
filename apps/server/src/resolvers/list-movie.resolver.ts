import { Resolver, Arg, Query, Int, Ctx } from 'type-graphql';

import { FindOptionsWhere } from 'typeorm';

import type { ServerContext } from '../types';

import { ListMovieRepository, ListRepository } from '../repositories';

import Movie from '../entities/mongo-entities/movie';
import ListMovie from '../entities/mongo-entities/list-movie';

import NotFoundError from '../errors/NotFound';
import AuthenticationError from '../errors/Authentication';

@Resolver()
export default class ListMovieResolver {
  async findMoviesFromList(
    listId: string,
    page: number,
    sort?: FindOptionsWhere<ListMovie>,
  ) {
    const listExists = await ListRepository.findOneBy({ id: listId });

    if (!listExists) {
      throw new NotFoundError('List not found');
    }

    const listMovies = await ListMovieRepository.findBy({
      listId: listExists.id,
      ...sort,
    });

    return listMovies.map(listMovie => listMovie.movie);
  }

  @Query(() => [Movie])
  async userListMovies(
    @Arg('listId') listId: string,
    @Arg('page', () => Int, { nullable: true }) page = 1,
  ) {
    return this.findMoviesFromList(listId, page);
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
}
