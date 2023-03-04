import {
  FindMoviesReferenceRepository,
  PreMadeListRepository,
  UserRepository,
} from '../../infra/repositories';

import {
  FindMoviesReferenceService,
  FindPreMadeListMoviesService,
} from '../../data/services';

export function getFindPreMadeListMoviesService(): FindPreMadeListMoviesService {
  const service = new FindPreMadeListMoviesService(
    new UserRepository(),
    new PreMadeListRepository(),
    new FindMoviesReferenceService(new FindMoviesReferenceRepository()),
  );

  return service;
}
