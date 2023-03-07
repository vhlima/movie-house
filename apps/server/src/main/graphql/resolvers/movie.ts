import { Arg, Int, Query, Resolver } from 'type-graphql';

import { MovieEntity } from '../../../infra/entities';

import {
  getDiscoverMoviesService,
  getFindMovieService,
  getMovieRecommendationsService,
  getSearchMovieService,
  getTrendingMoviesWeekService,
} from '../../factories';
import { TmDBMovieSortInput } from '../inputs';

import { MovieWithCredits } from '../objects/movie-with-credits';
import { TmDBMovieListPagination } from '../objects/tmdb-movie-list';

@Resolver(() => MovieEntity)
export class MovieResolver {
  @Query(() => MovieEntity)
  async movie(@Arg('movieId', () => Int) movieId: number) {
    const findMovieService = getFindMovieService();

    const movie = await findMovieService.handle(movieId);

    return movie;
  }

  @Query(() => MovieWithCredits)
  async movieWithCredits(@Arg('movieId', () => Int) movieId: number) {
    const findMovieService = getFindMovieService();

    const movie = await findMovieService.handle(movieId, true);

    return movie;
  }

  @Query(() => TmDBMovieListPagination)
  async discoverMovies(
    @Arg('page', () => Int) page: number,
    @Arg('sort', () => TmDBMovieSortInput, { nullable: true })
    sort?: TmDBMovieSortInput,
  ) {
    const discoverMoviesService = getDiscoverMoviesService();

    const discoverMoviesResponse = await discoverMoviesService.handle({
      page,
      sort,
    });

    return discoverMoviesResponse;
  }

  @Query(() => TmDBMovieListPagination)
  async searchMovie(
    @Arg('searchTerm') searchTerm: string,
    @Arg('page', () => Int) page: number,
  ) {
    const searchMovieService = getSearchMovieService();

    const searchMovieResponse = await searchMovieService.handle(
      searchTerm,
      page,
    );

    return searchMovieResponse;
  }

  @Query(() => TmDBMovieListPagination)
  async trendingMovies(@Arg('page', () => Int) page: number) {
    const trendingMoviesWeekService = getTrendingMoviesWeekService();

    const trendingMoviesResponse = await trendingMoviesWeekService.handle(page);

    return trendingMoviesResponse;
  }

  @Query(() => TmDBMovieListPagination)
  async movieRecommendations(
    @Arg('movieId', () => Int) movieId: number,
    @Arg('page', () => Int) page: number,
  ) {
    const movieRecommendationsService = getMovieRecommendationsService();

    const movieRecommendationsResponse =
      await movieRecommendationsService.handle(movieId, page);

    return movieRecommendationsResponse;
  }
}
