import {
  FindCommentariesRepository,
  PostRepository,
} from '../../infra/repositories';

import {
  FindCommentariesService,
  GetPaginationService,
} from '../../data/services';

import { Commentary } from '../../domain/entities';

export function getFindCommentariesService(): FindCommentariesService {
  const service = new FindCommentariesService(
    new PostRepository(),
    new FindCommentariesRepository(),
  );

  return service;
}

export function getFindCommentariesPaginatedService(): GetPaginationService<Commentary> {
  const service = new GetPaginationService<Commentary>();

  return service;
}
