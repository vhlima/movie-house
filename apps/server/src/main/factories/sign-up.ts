import { GithubRepository, UserRepository } from '../../infra/repositories';

import { SignUpService } from '../../data/services';

export function getSignUpService(): SignUpService {
  const service = new SignUpService(
    new GithubRepository(),
    new UserRepository(),
  );

  return service;
}
