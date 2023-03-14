import { FollowRepository } from '../../infra/repositories';

import { IsFollowingService } from '../../data/services';

export function getIsFollowingService(): IsFollowingService {
  const service = new IsFollowingService(new FollowRepository());

  return service;
}
