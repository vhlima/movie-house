import { ListRepository } from '../../infra/repositories';

import { FindListService } from '../../data/services';

export function getFindListService(): FindListService {
  const service = new FindListService(new ListRepository());

  return service;
}
