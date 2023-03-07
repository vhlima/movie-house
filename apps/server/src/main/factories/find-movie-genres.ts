import { FindMovieGenresService } from '../../data/services';
import { MovieRepository } from '../../infra/repositories';

export function getFindMovieGenresService(): FindMovieGenresService {
  const service = new FindMovieGenresService(new MovieRepository());

  return service;
}
