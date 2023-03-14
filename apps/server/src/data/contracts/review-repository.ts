import { ReviewModel } from '../models';

export interface IReviewRepository {
  getUserReviewByMovieId(
    userId: string,
    movieId: number,
  ): Promise<ReviewModel | null>;
  getReviewsFromMovie(
    movieId: number,
    sort?: Record<string, string>,
  ): Promise<ReviewModel[]>;
  getReviewById(reviewId: string): Promise<ReviewModel | null>;
  getUserPinnedReviewsCount(userId: string): Promise<number>;
  createReview(postId: string, movieId: number): Promise<ReviewModel>;
  deleteReview(reviewId: string): Promise<boolean>;
  toggleReviewPin(reviewId: string): Promise<boolean>;
}
