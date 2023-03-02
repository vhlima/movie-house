import { ObjectType } from 'type-graphql';

import { createPagination, ReplyEntity } from '../../../infra/entities';

@ObjectType()
export class ReplyPagination extends createPagination<ReplyEntity>(
  'Reply',
  () => ReplyEntity,
) {}
