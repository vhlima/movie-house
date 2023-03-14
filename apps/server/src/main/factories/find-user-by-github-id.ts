import { FindUserByGithubIdService } from '../../data/services';

import { UserRepository } from '../../infra/repositories';

export function getFindUserByGithubIdService(): FindUserByGithubIdService {
  const service = new FindUserByGithubIdService(new UserRepository());

  return service;
}
