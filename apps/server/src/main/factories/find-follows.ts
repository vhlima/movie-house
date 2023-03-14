import { FollowRepository, UserRepository } from '../../infra/repositories';

import { FindFollowsService } from '../../data/services';

export function getFindFollowService(): FindFollowsService {
  const service = new FindFollowsService(
    new UserRepository(),
    new FollowRepository(),
  );

  return service;
}
