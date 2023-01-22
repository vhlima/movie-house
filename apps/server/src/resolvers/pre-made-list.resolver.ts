import { Resolver, Mutation, Ctx, Arg, Int } from 'type-graphql';

import type { ServerContext } from '../types';

import { ListMovieRepository, PreMadeListRepository } from '../repositories';

import PreMadeListType from '../enums/PreMadeListType';

import ListMovie from '../entities/mongo-entities/list-movie';

import NotFoundError from '../errors/NotFound';

import AlreadyExistsError from '../errors/AlreadyExists';

import AuthenticationError from '../errors/Authentication';

@Resolver()
export default class PreMadeListResolver {
  @Mutation(() => ListMovie)
  async userPreMadeListAddMovie(
    @Ctx() { user, dataSources }: ServerContext,
    @Arg('movieId', () => Int) movieId: number,
    @Arg('listType', () => PreMadeListType)
    listType: PreMadeListType,
  ) {
    if (!user) {
      throw new AuthenticationError();
    }

    let preMadeList = await PreMadeListRepository.findOneBy({
      userId: user.id,
      listType,
    });

    if (!preMadeList) {
      preMadeList = PreMadeListRepository.create({
        userId: user.id,
        listType,
      });

      await PreMadeListRepository.save(preMadeList);
    }

    const movieExistsInList = await ListMovieRepository.findOneBy({
      listId: preMadeList.id,
      movieId,
    });

    if (movieExistsInList) {
      throw new AlreadyExistsError('This movie is already added to this list');
    }

    const movie = await dataSources.tmdb.getMovieById(movieId);

    if (!movie) {
      throw new NotFoundError('Movie not found');
    }

    const listMovie = ListMovieRepository.create({
      listId: preMadeList.id,
      movieId,
      movie,
    });

    await ListMovieRepository.save(listMovie);

    return listMovie;
  }

  @Mutation(() => Boolean)
  async userPreMadeListRemoveMovie(
    @Ctx() { user }: ServerContext,
    @Arg('movieId', () => Int) movieId: number,
    @Arg('listType', () => PreMadeListType)
    listType: PreMadeListType,
  ) {
    if (!user) {
      throw new AuthenticationError();
    }

    const preMadeListExists = await PreMadeListRepository.findOneBy({
      userId: user.id,
      listType,
    });

    if (!preMadeListExists) {
      return false;
    }

    const movieExistsInList = await ListMovieRepository.findOneBy({
      listId: preMadeListExists.id,
      movieId,
    });

    if (!movieExistsInList) {
      throw new AlreadyExistsError('This movie is not present in this list');
    }

    await ListMovieRepository.deleteOne({
      listId: preMadeListExists.id,
      movieId,
    });

    return true;
  }
}
