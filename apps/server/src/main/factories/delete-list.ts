import { ListRepository, PostRepository } from '../../infra/repositories';

import { DeleteListService } from '../../data/services';

export function getDeleteListService(): DeleteListService {
  const service = new DeleteListService(
    new ListRepository(),
    new PostRepository(),
  );

  return service;
}
