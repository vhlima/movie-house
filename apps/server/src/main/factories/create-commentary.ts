import { CommentaryRepository, PostRepository } from '../../infra/repositories';

import { CreateCommentaryService } from '../../data/services';

export function getCreateCommentaryService(): CreateCommentaryService {
  const service = new CreateCommentaryService(
    new PostRepository(),
    new CommentaryRepository(),
  );

  return service;
}
