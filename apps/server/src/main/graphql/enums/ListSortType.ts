import { registerEnumType } from 'type-graphql';

import { ListSortType as ListSortTypeEnum } from '../../../domain/entities';

export { ListSortType } from '../../../domain/entities';

registerEnumType(ListSortTypeEnum, {
  name: 'ListSort',
  description: 'List sort type enum',
});
