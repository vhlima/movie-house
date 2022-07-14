import type { DocumentType } from '@typegoose/typegoose';

import type { DatasourceContext } from '../api';

import Movie from '../entities/movie.interface';

import User from '../entities/user.interface';

import { UserModel } from '../models';

export const findUserById = async (
  userId: string,
): Promise<DocumentType<User>> => {
  const user = await UserModel.findById(userId);

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};

// TODO maybe remove that
export const findUserAndMovie = async (
  context: DatasourceContext,
  userId: string,
  movieId: string,
): Promise<[DocumentType<User>, DocumentType<Movie>]> => {
  const user = await UserModel.findById(userId);

  if (!user) {
    throw new Error('User not found');
  }

  const movie = await context.dataSources.tmdb.getMovieById(movieId);

  if (!movie) {
    throw new Error('Movie not found');
  }

  return [user, movie];
};
