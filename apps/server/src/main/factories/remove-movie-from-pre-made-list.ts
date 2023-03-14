import {
  MovieReferenceRepository,
  PreMadeListRepository,
} from '../../infra/repositories';

import { RemoveMovieFromPreMadeListService } from '../../data/services';

export function getRemoveMovieFromPreMadeListService(): RemoveMovieFromPreMadeListService {
  const service = new RemoveMovieFromPreMadeListService(
    new PreMadeListRepository(),
    new MovieReferenceRepository(),
  );

  return service;
}
