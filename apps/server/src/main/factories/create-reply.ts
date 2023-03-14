import {
  CommentaryRepository,
  ReplyRepository,
} from '../../infra/repositories';

import { CreateReplyService } from '../../data/services';

export function getCreateReplyService(): CreateReplyService {
  const service = new CreateReplyService(
    new CommentaryRepository(),
    new ReplyRepository(),
  );

  return service;
}
