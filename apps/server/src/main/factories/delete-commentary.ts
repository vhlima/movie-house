import { CommentaryRepository } from '../../infra/repositories';

import { DeleteCommentaryService } from '../../data/services';

export function getDeleteCommentaryService(): DeleteCommentaryService {
  const service = new DeleteCommentaryService(new CommentaryRepository());

  return service;
}
