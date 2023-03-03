import { MovieRepository } from '../../infra/repositories';

import { GetMovieRecommendationsService } from '../../data/services';

export function getMovieRecommendationsService(): GetMovieRecommendationsService {
  const service = new GetMovieRecommendationsService(new MovieRepository());

  return service;
}
