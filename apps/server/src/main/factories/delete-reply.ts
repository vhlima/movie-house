import { ReplyRepository } from '../../infra/repositories';

import { DeleteReplyService } from '../../data/services';

export function getDeleteReplyService(): DeleteReplyService {
  const service = new DeleteReplyService(new ReplyRepository());

  return service;
}
