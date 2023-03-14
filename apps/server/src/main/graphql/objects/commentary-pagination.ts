import { ObjectType } from 'type-graphql';

import { createPagination, CommentaryEntity } from '../../../infra/entities';

@ObjectType()
export class CommentaryPagination extends createPagination<CommentaryEntity>(
  'Commentary',
  () => CommentaryEntity,
) {}
