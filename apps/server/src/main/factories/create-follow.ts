import { FollowRepository, UserRepository } from '../../infra/repositories';

import { CreateFollowService } from '../../data/services';

export function getCreateFollowService(): CreateFollowService {
  const service = new CreateFollowService(
    new UserRepository(),
    new FollowRepository(),
  );

  return service;
}
