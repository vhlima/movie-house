import { ListRepository, PostRepository } from '../../infra/repositories';

import { CreateListService } from '../../data/services';

export function getCreateListService(): CreateListService {
  const service = new CreateListService(
    new ListRepository(),
    new PostRepository(),
  );

  return service;
}
