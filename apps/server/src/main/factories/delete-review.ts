import {
  MovieReferenceRepository,
  PostRepository,
  ReviewRepository,
} from '../../infra/repositories';

import { DeleteReviewService } from '../../data/services';

export function getDeleteReviewService(): DeleteReviewService {
  const service = new DeleteReviewService(
    new ReviewRepository(),
    new PostRepository(),
    new MovieReferenceRepository(),
  );

  return service;
}
