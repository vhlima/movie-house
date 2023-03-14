import {
  ListRepository,
  MovieReferenceRepository,
  MovieRepository,
} from '../../infra/repositories';

import {
  AddMovieToListService,
  CreateMovieReferenceService,
} from '../../data/services';

export function getAddMovieToListService(): AddMovieToListService {
  const service = new AddMovieToListService(
    new ListRepository(),
    new CreateMovieReferenceService(
      new MovieRepository(),
      new MovieReferenceRepository(),
    ),
  );

  return service;
}
