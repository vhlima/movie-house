import { ObjectType } from 'type-graphql';

import { createPagination, ListEntity } from '../../../infra/entities';

@ObjectType()
export class ListPagination extends createPagination<ListEntity>(
  'ListPagination',
  () => ListEntity,
) {}
