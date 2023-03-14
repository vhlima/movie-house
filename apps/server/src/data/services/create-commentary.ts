import { User, Commentary } from '../../domain/entities';
import { AuthenticationError, NotFoundError } from '../../domain/errors';

import { CreateCommentary } from '../../domain/usecases';

import { ICommentaryRepository, IPostRepository } from '../contracts';

export class CreateCommentaryService implements CreateCommentary {
  constructor(
    private readonly postRepository: IPostRepository,
    private readonly commentaryRepository: ICommentaryRepository,
  ) {}

  async handle(
    postId: string,
    content: string,
    session?: User | undefined,
  ): Promise<Commentary> {
    if (!session) {
      throw new AuthenticationError();
    }

    const postFound = await this.postRepository.getPostById(postId);

    if (!postFound) {
      throw new NotFoundError('PostNotFoundError', 'Post not found.');
    }

    const commentary = await this.commentaryRepository.createCommentary(
      session.id,
      postFound.id,
      content,
    );

    return commentary;
  }
}
