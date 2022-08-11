import type { DatasourceContext } from '../api';

import Movie from '../entities/movie';

export const findMovieById = async (
  context: DatasourceContext,
  movieId: string,
): Promise<Movie> => {
  try {
    const movie = await context.dataSources.tmdb.getMovieById(movieId);

    if (!movie) {
      throw new Error('Movie not found');
    }

    return movie;
  } catch (err) {
    throw new Error('Movie not found');
  }
};

export const findCreditsByMovieId = async (
  context: DatasourceContext,
  movieId: string,
): Promise<Movie> => {
  const movieCredits = await context.dataSources.tmdb.getCreditsByMovieId(
    movieId,
  );

  if (!movieCredits) {
    throw new Error('Movie not found');
  }

  return movieCredits;
};
