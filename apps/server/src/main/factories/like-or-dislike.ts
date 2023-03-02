import {
  CommentaryRepository,
  LikeRepository,
  PostRepository,
  ReplyRepository,
} from '../../infra/repositories';

import { LikeOrDislikeService } from '../../data/services';

export function getLikeOrDislikeService(): LikeOrDislikeService {
  const service = new LikeOrDislikeService(
    new LikeRepository(),
    new PostRepository(),
    new CommentaryRepository(),
    new ReplyRepository(),
  );

  return service;
}
