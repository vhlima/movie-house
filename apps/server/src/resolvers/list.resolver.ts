import { Resolver, Mutation, Ctx, Arg, Int, Query } from 'type-graphql';

import { Any } from 'typeorm';
import type { ServerContext } from '../types';

import {
  ListMovieRepository,
  ListRepository,
  PostRepository,
  UserRepository,
} from '../repositories';

import List from '../entities/pg-entities/list';

import AuthorizationError from '../errors/Authorization';

import ListMovie from '../entities/mongo-entities/list-movie';

import NotFoundError from '../errors/NotFound';

import UserNotFoundError from '../errors/UserNotFound';

import AlreadyExistsError from '../errors/AlreadyExists';

import AuthenticationError from '../errors/Authentication';

@Resolver()
export default class ListResolver {
  @Query(() => [List])
  async userLists(@Arg('userId') userId: string) {
    const user = await UserRepository.findOneBy({ id: userId });

    if (!user) {
      throw new UserNotFoundError();
    }

    const listsFound = await ListRepository.find({
      where: { post: { userId } },
      relations: ['post'],
    });

    return listsFound;
  }

  @Query(() => List)
  async userList(@Arg('postId', () => Int) postId: number) {
    const listFound = await ListRepository.findOne({
      where: { post: { id: postId } },
      relations: ['post'],
    });

    if (!listFound) {
      throw new NotFoundError('List not found');
    }

    return listFound;
  }

  @Mutation(() => List)
  async userListCreate(
    @Ctx() { user }: ServerContext,
    @Arg('name') name: string,
    @Arg('body', { nullable: true }) body?: string,
  ) {
    if (!user) {
      throw new AuthenticationError();
    }

    const userListExists = await ListRepository.findOne({
      where: {
        post: { userId: user.id },
        name,
      },
      relations: ['post'],
    });

    if (userListExists) {
      throw new AlreadyExistsError('A list with that name already exists');
    }

    const post = PostRepository.create({
      userId: user.id,
      // TODO temporary workaround
      body: body || '',
    });

    await PostRepository.save(post);

    const userList = ListRepository.create({
      postId: post.id,
      name,
    });

    const updatedList = await ListRepository.save(userList);

    return updatedList;
  }

  @Mutation(() => Boolean)
  async userListDelete(
    @Ctx() { user }: ServerContext,
    @Arg('listId') listId: string,
  ) {
    if (!user) {
      throw new AuthenticationError();
    }

    const listExists = await ListRepository.findOne({
      where: { id: listId },
      relations: ['post'],
    });

    if (!listExists) {
      throw new AlreadyExistsError('List not found');
    }

    if (listExists.post.userId !== user.id) {
      throw new AuthorizationError();
    }

    // TODO delete movies from MongoDB

    await PostRepository.delete(listExists.post.id);

    return true;
  }

  @Mutation(() => ListMovie)
  async userListAddMovie(
    @Ctx() { user, dataSources }: ServerContext,
    @Arg('listId') listId: string,
    @Arg('movieId', () => Int) movieId: number,
  ) {
    if (!user) {
      throw new AuthenticationError();
    }

    const listExists = await ListRepository.findOne({
      where: { id: listId },
      relations: ['post'],
    });

    if (!listExists) {
      throw new NotFoundError('List not found');
    }

    if (listExists.post.userId !== user.id) {
      throw new AuthorizationError();
    }

    const listMovieExists = await ListMovieRepository.findOneBy({
      listId: listExists.id,
      movieId,
    });

    if (listMovieExists) {
      throw new AlreadyExistsError('This movie is already in this list');
    }

    const movie = await dataSources.tmdb.getMovieById(movieId);

    if (!movie) {
      throw new NotFoundError('Movie not found');
    }

    const listMovie = ListMovieRepository.create({
      listId: listExists.id,
      movieId,
      movie,
    });

    await ListMovieRepository.save(listMovie);

    return listMovie;
  }

  @Mutation(() => Boolean)
  async userListRemoveMovie(
    @Ctx() { user }: ServerContext,
    @Arg('listId') listId: string,
    @Arg('movieId', () => Int) movieId: number,
  ) {
    if (!user) {
      throw new AuthenticationError();
    }

    const listExists = await ListRepository.findOne({
      where: { id: listId },
      relations: ['post'],
    });

    if (!listExists) {
      throw new NotFoundError('List not found');
    }

    if (listExists.post.userId !== user.id) {
      throw new AuthorizationError();
    }

    const listMovieExists = ListMovieRepository.findOneBy({
      listId: listExists.id,
      movieId,
    });

    if (!listMovieExists) {
      throw new NotFoundError('This movie is not present in this list');
    }

    await ListMovieRepository.deleteOne(listMovieExists);

    return true;
  }

  @Query(() => [List])
  async moviePopularLists(@Arg('movieId', () => Int) movieId: number) {
    const listMovies = await ListMovieRepository.find({
      where: { movieId },
      take: 3,
    });

    const lists = await ListRepository.find({
      where: { id: Any(listMovies.map(listMovie => listMovie.listId)) },
      relations: ['post', 'post.user'],
    });

    return lists.map(list => ({
      ...list,
      user: list.post.user,
    }));
  }
}
