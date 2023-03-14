import { Review } from '../../domain/entities';

import { FindReview } from '../../domain/usecases';

import { IReviewRepository } from '../contracts';

import { ReviewNotFoundError } from '../../domain/errors';

export class FindReviewService implements FindReview {
  constructor(private readonly reviewRepository: IReviewRepository) {}

  async handle(reviewId: string): Promise<Review | null> {
    const reviewFound = await this.reviewRepository.getReviewById(reviewId);

    if (!reviewFound) {
      throw new ReviewNotFoundError();
    }

    reviewFound.user = reviewFound.post.user;

    return reviewFound;
  }
}
