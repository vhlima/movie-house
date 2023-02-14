import { Resolver, Query, Arg, Ctx, Int } from 'type-graphql';

import type { ServerContext } from '../types';

import Movie from '../entities/mongo-entities/movie';

import MoviesPaginated from '../objects/movies-paginated';
import MovieTrending from '../objects/movie-trending';

import MovieSortInput from '../inputs/movie-sort.input';

import Error from '../errors/Error';
import NotFoundError from '../errors/NotFound';

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

  @Query(() => MoviesPaginated)
  async searchMovie(
    @Ctx() context: ServerContext,
    @Arg('searchTerm') searchTerm: string,
    @Arg('page', () => Int, { nullable: true }) page = 1,
  ) {
    const searchResponse = await context.dataSources.tmdb.searchMovie(
      searchTerm,
      page,
    );

    if (!searchResponse) {
      throw new Error('PageNotFound', 'Page not found');
    }

    if (searchResponse.total_results === 0) {
      return searchResponse;
    }

    if (searchResponse.page > searchResponse.total_pages) {
      throw new Error('PageNotFound', 'Page not found');
    }

    // TODO bug: Invalid time value

    return searchResponse;
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

  @Query(() => MoviesPaginated)
  async movies(
    @Ctx() { dataSources }: ServerContext,
    @Arg('sort', { nullable: true }) sort?: MovieSortInput,
    @Arg('page', () => Int, { nullable: true }) page = 1,
  ) {
    const moviesResponse = await dataSources.tmdb.getMovies(page, sort);

    return moviesResponse;
  }
}

export default MovieResolver;
