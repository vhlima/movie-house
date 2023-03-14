import { registerEnumType } from 'type-graphql';

import { ListSortType } from '../../../data/enums';

export { ListSortType };

registerEnumType(ListSortType, {
  name: 'ListSortType',
  description: 'List sort type enum',
});
