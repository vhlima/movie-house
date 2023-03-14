import {
  CommentaryRepository,
  FindRepliesRepository,
} from '../../infra/repositories';

import { FindRepliesService, GetPaginationService } from '../../data/services';

import { Reply } from '../../domain/entities';

export function getFindRepliesService(): FindRepliesService {
  const service = new FindRepliesService(
    new CommentaryRepository(),
    new FindRepliesRepository(),
  );

  return service;
}

export function getFindRepliesPaginatedService(): GetPaginationService<Reply> {
  const service = new GetPaginationService<Reply>();

  return service;
}
