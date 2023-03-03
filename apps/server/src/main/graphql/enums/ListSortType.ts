import { registerEnumType } from 'type-graphql';

import { ListSortType as ListSortTypeEnum } from '../../../domain/entities';

export { ListSortType } from '../../../domain/entities';

registerEnumType(ListSortTypeEnum, {
  name: 'ListSortType',
  description: 'List sort type enum',
});
