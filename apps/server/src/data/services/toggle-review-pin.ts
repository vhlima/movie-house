import { User } from '../../domain/entities';

import { ToggleReviewPin } from '../../domain/usecases';

import {
  AuthenticationError,
  LimitReachedError,
  ReviewNotFoundError,
  UnauthorizedError,
} from '../../domain/errors';

import { IReviewRepository } from '../contracts';

const MAX_PINNED_REVIEWS = 3;

export class ToggleReviewPinService implements ToggleReviewPin {
  constructor(private readonly reviewRepository: IReviewRepository) {}

  async handle(reviewId: string, session?: User | undefined): Promise<boolean> {
    if (!session) {
      throw new AuthenticationError();
    }

    const reviewFound = await this.reviewRepository.getReviewById(reviewId);

    if (!reviewFound) {
      throw new ReviewNotFoundError();
    }

    if (reviewFound.post.userId !== session.id) {
      throw new UnauthorizedError();
    }

    const reviewCount = await this.reviewRepository.getUserPinnedReviewsCount(
      session.id,
    );

    if (!reviewFound.isPinned && reviewCount >= MAX_PINNED_REVIEWS) {
      throw new LimitReachedError(
        `You have reached the maximum amount of ${MAX_PINNED_REVIEWS} reviews pinned.`,
      );
    }

    const isPinned = await this.reviewRepository.toggleReviewPin(reviewId);

    return isPinned;
  }
}
