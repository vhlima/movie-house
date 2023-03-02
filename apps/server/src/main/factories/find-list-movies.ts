import {
  FindMoviesReferenceRepository,
  ListRepository,
} from '../../infra/repositories';

import {
  FindListMoviesService,
  GetPaginationService,
} from '../../data/services';

import { MovieReference } from '../../domain/entities';

export function getFindListMoviesService(): FindListMoviesService {
  const service = new FindListMoviesService(
    new ListRepository(),
    new FindMoviesReferenceRepository(),
  );

  return service;
}

export function getFindListMoviesPaginatedService(): GetPaginationService<MovieReference> {
  const service = new GetPaginationService<MovieReference>();

  return service;
}
