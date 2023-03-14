import { ObjectType } from 'type-graphql';

import { createPagination, ReviewEntity } from '../../../infra/entities';

@ObjectType()
export class ReviewPagination extends createPagination<ReviewEntity>(
  'Review',
  () => ReviewEntity,
) {}
