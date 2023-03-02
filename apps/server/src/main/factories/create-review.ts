import {
  MovieReferenceRepository,
  MovieRepository,
  PostRepository,
  ReviewRepository,
} from '../../infra/repositories';

import { CreateReviewService } from '../../data/services';

export function getCreateReviewService(): CreateReviewService {
  const service = new CreateReviewService(
    new ReviewRepository(),
    new PostRepository(),
    new MovieReferenceRepository(),
    new MovieRepository(),
  );

  return service;
}
