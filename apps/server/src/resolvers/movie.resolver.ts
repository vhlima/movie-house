import { Resolver, Query, Arg, Ctx, Int } from 'type-graphql';

import type { ServerContext } from '../types';

import Movie from '../entities/mongo-entities/movie';

import MovieSearch from '../objects/movie-search';
import MovieTrending from '../objects/movie-trending';

import NotFoundError from '../errors/NotFound';
import Error from '../errors/Error';

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
    @Arg('page', () => Int, { nullable: true }) page = 1,
  ) {
    const searchResponse = await context.dataSources.tmdb.searchMovie(
      searchTerm,
      page,
    );

    if (searchResponse.total_results === 0) {
      return searchResponse;
    }

    if (searchResponse.page > searchResponse.total_pages) {
      throw new Error('PageNotFound', 'Page not found');
    }

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

  @Query(() => [Movie])
  async movieRecommendations(
    @Ctx() { dataSources }: ServerContext,
    @Arg('movieId', () => Int) movieId: number,
  ) {
    const recommendationsResponse =
      await dataSources.tmdb.getMovieRecommendations(movieId);

    if (!recommendationsResponse) {
      return [];
    }

    return recommendationsResponse.results.map(movie => movie);
  }
}

export default MovieResolver;
