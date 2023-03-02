import { ReviewRepository } from '../../infra/repositories';

import { ToggleReviewPinService } from '../../data/services';

export function getToggleReviewPin(): ToggleReviewPinService {
  const service = new ToggleReviewPinService(new ReviewRepository());

  return service;
}
