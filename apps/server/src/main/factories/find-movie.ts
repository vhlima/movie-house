import { MovieRepository } from '../../infra/repositories';

import { FindMovieService } from '../../data/services';

export function getFindMovieService(): FindMovieService {
  const service = new FindMovieService(new MovieRepository());

  return service;
}
