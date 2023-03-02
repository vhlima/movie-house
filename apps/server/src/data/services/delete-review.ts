import { DeleteReview } from '../../domain/usecases';

import {
  IMovieReferenceRepository,
  IPostRepository,
  IReviewRepository,
} from '../contracts';

import { User } from '../../domain/entities';

import { ReviewNotFoundError, UnauthorizedError } from '../../domain/errors';

export class DeleteReviewService implements DeleteReview {
  constructor(
    private readonly reviewRepository: IReviewRepository,
    private readonly postRepository: IPostRepository,
    private readonly movieReferenceRepository: IMovieReferenceRepository,
  ) {}

  async handle(postId: string, session?: User): Promise<boolean> {
    if (!session) {
      throw new UnauthorizedError();
    }

    const reviewFound = await this.reviewRepository.getReviewByPostId(postId);

    if (!reviewFound) {
      throw new ReviewNotFoundError();
    }

    if (reviewFound.post.userId !== session.id) {
      throw new UnauthorizedError();
    }

    const postDeleteResponse = await this.postRepository.deletePost(postId);

    if (!postDeleteResponse) {
      return false;
    }

    const movieReferenceDeleteResponse =
      await this.movieReferenceRepository.deleteMovieReference(reviewFound.id);

    return movieReferenceDeleteResponse;
  }
}
