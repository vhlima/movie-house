import { ObjectType } from 'type-graphql';

import { createPagination, FollowEntity } from '../../../infra/entities';

@ObjectType()
export class FollowPagination extends createPagination<FollowEntity>(
  'FollowPagination',
  () => FollowEntity,
) {}
