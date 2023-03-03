import { MovieRepository } from '../../infra/repositories';

import { GetDiscoverMoviesService } from '../../data/services';

export function getDiscoverMoviesService(): GetDiscoverMoviesService {
  const service = new GetDiscoverMoviesService(new MovieRepository());

  return service;
}
