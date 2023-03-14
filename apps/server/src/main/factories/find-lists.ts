import {
  FindListsRepository,
  FindMoviesReferenceRepository,
} from '../../infra/repositories';

import { FindListsService } from '../../data/services';

import { FindMoviesReferenceService } from '../../data/services/find-movies-reference';

export function getFindListsService(): FindListsService {
  const service = new FindListsService(
    new FindListsRepository(),
    new FindMoviesReferenceService(new FindMoviesReferenceRepository()),
  );

  return service;
}
