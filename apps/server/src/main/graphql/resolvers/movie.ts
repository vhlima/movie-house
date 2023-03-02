import { Arg, Int, Query, Resolver } from 'type-graphql';

import { MovieEntity } from '../../../infra/entities';

import { getFindMovieService } from '../../factories';

import { MovieWithCredits } from '../objects/movie-with-credits';

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
}
