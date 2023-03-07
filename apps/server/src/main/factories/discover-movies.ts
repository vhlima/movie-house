import { DiscoverMoviesRepository } from '../../infra/repositories';

import { DiscoverMoviesService } from '../../data/services';

export function getDiscoverMoviesService(): DiscoverMoviesService {
  const service = new DiscoverMoviesService(new DiscoverMoviesRepository());

  return service;
}
