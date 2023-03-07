import {
  DiscoverMoviesRepository,
  MovieRepository,
  StreamingProviderRepository,
} from '../../infra/repositories';

import { DiscoverMoviesService } from '../../data/services';

export function getDiscoverMoviesService(): DiscoverMoviesService {
  const service = new DiscoverMoviesService(
    new DiscoverMoviesRepository(),
    new MovieRepository(),
    new StreamingProviderRepository(),
  );

  return service;
}
