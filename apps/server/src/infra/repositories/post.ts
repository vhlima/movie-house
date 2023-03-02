import type { IPostRepository } from '../../data/contracts';

import { PostgresDataSource } from '../data-sources';

import { Post } from '../../domain/entities';

import { PostEntity } from '../entities';

export class PostRepository implements IPostRepository {
  private getPostRepository() {
    return PostgresDataSource.getRepository(PostEntity);
  }

  async getPostById(postId: string): Promise<Post | null> {
    const postRepository = this.getPostRepository();

    const post = postRepository.findOneBy({ id: postId });

    return post;
  }

  async createPost(userId: string, content: string): Promise<Post> {
    const postRepository = this.getPostRepository();

    const post = postRepository.create({
      userId,
      content,
    });

    await postRepository.save(post);

    return post;
  }

  async deletePost(postId: string): Promise<boolean> {
    const postRepository = this.getPostRepository();

    await postRepository.delete({ id: postId });

    return true;
  }
}
