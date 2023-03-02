import {
  ListRepository,
  MovieReferenceRepository,
} from '../../infra/repositories';

import { RemoveMovieFromListService } from '../../data/services';

export function getRemoveMovieFromListService(): RemoveMovieFromListService {
  const service = new RemoveMovieFromListService(
    new ListRepository(),
    new MovieReferenceRepository(),
  );

  return service;
}
