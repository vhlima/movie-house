import { Resolver, Query, Arg, Ctx } from 'type-graphql';

import type { DatasourceContext } from '../api';

import { findCreditsByMovieId } from '../controllers/movie.controller';

import Credits from '../entities/credits.interface';

@Resolver(() => Credits)
class CreditsResolver {
  @Query(() => Credits)
  async getMovieCredits(
    @Ctx() context: DatasourceContext,
    @Arg('movieId') movieId: string,
  ) {
    const credits = await findCreditsByMovieId(context, movieId);

    return credits;
  }
}

export default CreditsResolver;
