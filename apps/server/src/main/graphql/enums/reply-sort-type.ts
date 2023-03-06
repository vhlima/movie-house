import { registerEnumType } from 'type-graphql';

import { ReplySortType } from '../../../data/enums';

export { ReplySortType };

registerEnumType(ReplySortType, {
  name: 'ReplySortType',
  description: 'Reply sort type enum',
});
