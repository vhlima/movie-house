import { UserRepository } from '../../infra/repositories';

import { FindUserService } from '../../data/services';

export function getFindUserService(): FindUserService {
  const service = new FindUserService(new UserRepository());

  return service;
}
