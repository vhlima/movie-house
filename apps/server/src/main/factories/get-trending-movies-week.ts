import { MovieRepository } from '../../infra/repositories';

import { GetTrendingMoviesWeekService } from '../../data/services';

export function getTrendingMoviesWeekService(): GetTrendingMoviesWeekService {
  const service = new GetTrendingMoviesWeekService(new MovieRepository());

  return service;
}
