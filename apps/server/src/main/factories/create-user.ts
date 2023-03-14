import { UserRepository } from '../../infra/repositories';

import { CreateUserService } from '../../data/services';

export function getCreateUserService(): CreateUserService {
  const service = new CreateUserService(new UserRepository());

  return service;
}
