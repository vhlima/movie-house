import { IReviewRepository } from '../../data/contracts';

import { Review } from '../../domain/entities';

import { ReviewNotFoundError } from '../../domain/errors';

import { PostgresDataSource } from '../data-sources';

import { ReviewEntity } from '../entities';

export class ReviewRepository implements IReviewRepository {
  private getReviewRepository() {
    return PostgresDataSource.getRepository(ReviewEntity);
  }

  async getReviewByPostId(postId: string): Promise<Review | null> {
    const reviewExists = await this.getReviewRepository().findOne({
      where: { postId },
      relations: ['post', 'post.user'],
    });

    if (!reviewExists) {
      throw new ReviewNotFoundError();
    }

    return reviewExists;
  }

  async getUserReviewByMovieId(
    userId: string,
    movieId: number,
  ): Promise<Review | null> {
    const reviewExists = await this.getReviewRepository().findOne({
      where: { movieId, post: { userId } },
      relations: ['post', 'post.user'],
    });

    return reviewExists;
  }

  async getReviewsFromMovie(
    movieId: number,
    sort?: Record<string, string> | undefined,
  ): Promise<Review[]> {
    const reviewRepository = this.getReviewRepository();

    const reviews = await reviewRepository.find({
      relations: ['post'],
      where: { movieId },
      take: 3,
    });

    return reviews;
  }

  async getUserPinnedReviewsCount(userId: string): Promise<number> {
    const reviewRepository = this.getReviewRepository();

    const reviewCount = await reviewRepository.count({
      relations: ['post'],
      where: { isPinned: true, post: { userId } },
    });

    return reviewCount;
  }

  async createReview(
    userId: string,
    postId: string,
    movieId: number,
  ): Promise<Review> {
    const reviewRepository = this.getReviewRepository();

    const review = reviewRepository.create({
      postId,
      movieId,
    });

    await reviewRepository.save(review);

    return review;
  }

  async deleteReview(postId: string): Promise<boolean> {
    const reviewRepository = this.getReviewRepository();

    await reviewRepository.delete({ postId });

    return true;
  }

  async toggleReviewPin(postId: string): Promise<boolean> {
    const reviewRepository = this.getReviewRepository();

    const reviewUpdated = await reviewRepository
      .createQueryBuilder()
      .update(ReviewEntity)
      .set({ isPinned: () => 'NOT is_pinned' })
      .where('postId = :postId', { postId })
      .returning('is_pinned')
      .execute();

    return reviewUpdated.raw[0].is_pinned;
  }
}
