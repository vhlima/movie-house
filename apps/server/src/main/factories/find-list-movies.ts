import {
  FindMoviesReferenceRepository,
  ListRepository,
} from '../../infra/repositories';

import {
  FindListMoviesService,
  FindMoviesReferenceService,
} from '../../data/services';

export function getFindListMoviesService(): FindListMoviesService {
  const service = new FindListMoviesService(
    new ListRepository(),
    new FindMoviesReferenceService(new FindMoviesReferenceRepository()),
  );

  return service;
}
