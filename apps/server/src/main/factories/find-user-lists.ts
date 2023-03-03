import { FindUserListsService } from '../../data/services';

import { ListRepository, UserRepository } from '../../infra/repositories';

export function getFindUserLists(): FindUserListsService {
  const service = new FindUserListsService(
    new UserRepository(),
    new ListRepository(),
  );

  return service;
}
