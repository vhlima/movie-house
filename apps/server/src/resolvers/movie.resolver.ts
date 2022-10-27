import { Resolver, Query, Arg, Ctx, Int } from 'type-graphql';

import type { ServerContext } from '../types';

import Movie from '../entities/mongo-entities/movie';

import MovieSearch from '../entities/movie-search.interface';

import NotFoundError from '../errors/NotFound';

import MovieTrending from '../entities/movie-trending';

@Resolver(() => Movie)
class MovieResolver {
  @Query(() => Movie)
  async movie(
    @Ctx() context: ServerContext,
    @Arg('movieId', () => Int) movieId: number,
  ) {
    const movie = await context.dataSources.tmdb.getMovieById(movieId);

    if (!movie) {
      throw new NotFoundError('Movie not found');
    }

    return movie;
  }

  @Query(() => MovieSearch)
  async searchMovie(
    @Ctx() context: ServerContext,
    @Arg('searchTerm') searchTerm: string,
  ) {
    const searchResponse = await context.dataSources.tmdb.searchMovie(
      searchTerm,
    );

    // TODO bug: Invalid time value

    const results = searchResponse.results.map(movie => {
      const releaseDate = movie.release_date && new Date(movie.release_date);

      return {
        ...movie,
        release_date:
          releaseDate && typeof releaseDate.getDate() === 'number'
            ? releaseDate
            : undefined,
      };
    });

    return {
      ...searchResponse,
      results,
    };
  }

  @Query(() => MovieTrending)
  async trendingMovies(
    @Ctx() { dataSources }: ServerContext,
    @Arg('page', () => Int) page: number,
  ) {
    const movies = await dataSources.tmdb.getTrendingMoviesWeek(page);

    return movies;
  }
}

export default MovieResolver;
