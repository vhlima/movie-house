import { MovieRepository } from '../../infra/repositories';

import { SearchMovieService } from '../../data/services';

export function getSearchMovieService(): SearchMovieService {
  const service = new SearchMovieService(new MovieRepository());

  return service;
}
