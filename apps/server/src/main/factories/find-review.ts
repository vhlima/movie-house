import { ReviewRepository } from '../../infra/repositories';

import { FindReviewService } from '../../data/services';

export function getFindReviewService(): FindReviewService {
  const service = new FindReviewService(new ReviewRepository());

  return service;
}
