import {
  FindReviewsRepository,
  UserRepository,
} from '../../infra/repositories';

import { FindReviewsService, GetPaginationService } from '../../data/services';

import { Review } from '../../domain/entities';

export function getFindReviewsService(): FindReviewsService {
  const service = new FindReviewsService(
    new UserRepository(),
    new FindReviewsRepository(),
  );

  return service;
}

export function getFindReviewsPaginatedService(): GetPaginationService<Review> {
  const service = new GetPaginationService<Review>();

  return service;
}
