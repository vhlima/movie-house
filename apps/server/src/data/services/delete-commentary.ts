import { User } from '../../domain/entities';

import { DeleteCommentary } from '../../domain/usecases';

import {
  AuthenticationError,
  NotFoundError,
  UnauthorizedError,
} from '../../domain/errors';

import { ICommentaryRepository } from '../contracts';

export class DeleteCommentaryService implements DeleteCommentary {
  constructor(private readonly commentaryRepository: ICommentaryRepository) {}

  async handle(
    commentaryId: string,
    session?: User | undefined,
  ): Promise<boolean> {
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

    if (commentaryFound.userId !== session.id) {
      throw new UnauthorizedError();
    }

    await this.commentaryRepository.deleteCommentary(commentaryId);

    return true;
  }
}
