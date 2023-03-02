import { PostModel } from '../models';

export interface IPostRepository {
  getPostById(postId: string): Promise<PostModel | null>;
  createPost(userId: string, content?: string): Promise<PostModel>;
  deletePost(postId: string): Promise<boolean>;
}
