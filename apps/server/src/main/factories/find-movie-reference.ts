import { MovieReferenceRepository } from '../../infra/repositories';

import { FindMovieReferenceService } from '../../data/services';

export function getFindMovieReference(): FindMovieReferenceService {
  const service = new FindMovieReferenceService(new MovieReferenceRepository());

  return service;
}
