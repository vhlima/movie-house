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
  getReviewByPostId(postId: string): Promise<ReviewModel | null>;
  getUserPinnedReviewsCount(userId: string): Promise<number>;
  createReview(
    userId: string,
    postId: string,
    movieId: number,
  ): Promise<ReviewModel>;
  deleteReview(postId: string): Promise<boolean>;
  toggleReviewPin(postId: string): Promise<boolean>;
}
