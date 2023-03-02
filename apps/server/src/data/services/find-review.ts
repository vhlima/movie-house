import { Review } from '../../domain/entities';

import { FindReview } from '../../domain/usecases';

import { IReviewRepository } from '../contracts';

import { ReviewNotFoundError } from '../../domain/errors';

export class FindReviewService implements FindReview {
  constructor(private readonly reviewRepository: IReviewRepository) {}

  async handle(postId: string): Promise<Review | null> {
    const reviewFound = this.reviewRepository.getReviewByPostId(postId);

    if (!reviewFound) {
      throw new ReviewNotFoundError();
    }

    return reviewFound;
  }
}
