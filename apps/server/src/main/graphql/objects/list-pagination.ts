import { ObjectType } from 'type-graphql';

import { createPagination, ListPreviewEntity } from '../../../infra/entities';

@ObjectType()
export class ListPagination extends createPagination<ListPreviewEntity>(
  'ListPreviewPagination',
  () => ListPreviewEntity,
) {}
