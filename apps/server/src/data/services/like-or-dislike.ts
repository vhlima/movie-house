import { User } from '../../domain/entities';

import { AuthenticationError, NotFoundError } from '../../domain/errors';

import { LikeOrDislike, LikeType } from '../../domain/usecases';

import {
  ICommentaryRepository,
  ILikeRepository,
  IPostRepository,
  IReplyRepository,
} from '../contracts';

export class LikeOrDislikeService implements LikeOrDislike {
  constructor(
    private readonly likeRepository: ILikeRepository,
    private readonly postRepository: IPostRepository,
    private readonly commentaryRepository: ICommentaryRepository,
    private readonly replyRepository: IReplyRepository,
  ) {}

  async handle(
    contentId: string,
    likeType: LikeType,
    session?: User | undefined,
  ): Promise<boolean> {
    if (!session) {
      throw new AuthenticationError();
    }

    switch (likeType) {
      case LikeType.POST: {
        const postExists = await this.postRepository.getPostById(contentId);

        if (!postExists) {
          throw new NotFoundError('PostNotFoundError', 'Post not found.');
        }

        break;
      }

      case LikeType.COMMENTARY: {
        const commentaryExists =
          await this.commentaryRepository.getCommentaryById(contentId);

        if (!commentaryExists) {
          throw new NotFoundError(
            'CommentaryNotFoundError',
            'Commentary not found.',
          );
        }

        break;
      }

      case LikeType.REPLY: {
        const replyExists = await this.replyRepository.getReplyById(contentId);

        if (!replyExists) {
          throw new NotFoundError('ReplyNotFoundError', 'Reply not found.');
        }

        break;
      }

      default: {
        break;
      }
    }

    const isLike = await this.likeRepository.likeOrDislike(
      session.id,
      contentId,
      likeType,
    );

    return isLike;
  }
}
