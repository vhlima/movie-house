import { CommentaryModel } from '../models';

export interface ICommentaryRepository {
  getCommentaryById(commentaryId: string): Promise<CommentaryModel | null>;
  createCommentary(
    userId: string,
    postId: string,
    content: string,
  ): Promise<CommentaryModel>;
  deleteCommentary(commentaryId: string): Promise<boolean>;
}
