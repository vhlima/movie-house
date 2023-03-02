import {
  MovieReferenceRepository,
  MovieRepository,
  PreMadeListRepository,
} from '../../infra/repositories';

import {
  AddMovieToPreMadeListService,
  CreateMovieReferenceService,
} from '../../data/services';

export function getAddMovieToPreMadeListService(): AddMovieToPreMadeListService {
  const service = new AddMovieToPreMadeListService(
    new PreMadeListRepository(),
    new CreateMovieReferenceService(
      new MovieRepository(),
      new MovieReferenceRepository(),
    ),
  );

  return service;
}
