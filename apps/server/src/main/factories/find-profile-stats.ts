import {
  ListRepository,
  MovieReferenceRepository,
  PreMadeListRepository,
  UserRepository,
} from '../../infra/repositories';

import {
  FindProfileStatsService,
  GetPreMadeListMovieCountService,
} from '../../data/services';

export function getFindProfileStatsService(): FindProfileStatsService {
  const service = new FindProfileStatsService(
    new UserRepository(),
    new ListRepository(),
    new GetPreMadeListMovieCountService(
      new PreMadeListRepository(),
      new MovieReferenceRepository(),
    ),
  );

  return service;
}
