import { User, Reply } from '../../domain/entities';

import { AuthenticationError, NotFoundError } from '../../domain/errors';

import { CreateReply } from '../../domain/usecases';

import { ICommentaryRepository, IReplyRepository } from '../contracts';

export class CreateReplyService implements CreateReply {
  constructor(
    private readonly commentaryRepository: ICommentaryRepository,
    private readonly replyRepository: IReplyRepository,
  ) {}

  async handle(
    commentaryId: string,
    content: string,
    session?: User | undefined,
  ): Promise<Reply> {
    if (!session) {
      throw new AuthenticationError();
    }

    const commentaryFound = await this.commentaryRepository.getCommentaryById(
      commentaryId,
    );

    if (!commentaryFound) {
      throw new NotFoundError(
        'CommentaryNotFoundError',
        'Commentary not found.',
      );
    }

    const reply = await this.replyRepository.createReply(
      session.id,
      commentaryFound.id,
      content,
    );

    return reply;
  }
}
