import type { ICommentaryRepository } from '../../data/contracts';

import { PostgresDataSource } from '../data-sources';

import { Commentary } from '../../domain/entities';

import { CommentaryEntity } from '../entities';

export class CommentaryRepository implements ICommentaryRepository {
  private getCommentaryRepository() {
    return PostgresDataSource.getRepository(CommentaryEntity);
  }

  async getCommentaryById(commentaryId: string): Promise<Commentary | null> {
    const commentaryRepository = this.getCommentaryRepository();

    const commentaryFound = await commentaryRepository.findOneBy({
      id: commentaryId,
    });

    return commentaryFound;
  }

  async createCommentary(
    userId: string,
    postId: string,
    content: string,
  ): Promise<Commentary> {
    const commentaryRepository = this.getCommentaryRepository();

    const commentary = commentaryRepository.create({
      userId,
      postId,
      content,
    });

    await commentaryRepository.save(commentary);

    return commentary;
  }

  async deleteCommentary(commentaryId: string): Promise<boolean> {
    const commentarRepository = this.getCommentaryRepository();

    await commentarRepository.delete({
      id: commentaryId,
    });

    return true;
  }
}
