import { FollowRepository, UserRepository } from '../../infra/repositories';

import { DeleteFollowService } from '../../data/services';

export function getDeleteFollowService(): DeleteFollowService {
  const service = new DeleteFollowService(
    new UserRepository(),
    new FollowRepository(),
  );

  return service;
}
