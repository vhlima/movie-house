import {
  MovieReferenceRepository,
  PreMadeListRepository,
} from '../../infra/repositories';

import { IsMovieOnPreMadeListService } from '../../data/services';

export function getIsMovieOnPreMadeListService(): IsMovieOnPreMadeListService {
  const service = new IsMovieOnPreMadeListService(
    new PreMadeListRepository(),
    new MovieReferenceRepository(),
  );

  return service;
}
