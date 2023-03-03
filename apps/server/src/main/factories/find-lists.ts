import { FindListsRepository } from '../../infra/repositories';

import { FindListsService, GetPaginationService } from '../../data/services';

import { List } from '../../domain/entities';

export function getFindListsService(): FindListsService {
  const service = new FindListsService(new FindListsRepository());

  return service;
}

export function getFindListsPaginatedService(): GetPaginationService<List> {
  const service = new GetPaginationService<List>();

  return service;
}
