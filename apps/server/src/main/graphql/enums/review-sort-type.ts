import { registerEnumType } from 'type-graphql';

import { ReviewSortType } from '../../../data/enums';

export { ReviewSortType };

registerEnumType(ReviewSortType, {
  name: 'ReviewSortType',
  description: 'Review sort type enum',
});
