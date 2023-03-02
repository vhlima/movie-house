import { registerEnumType } from 'type-graphql';

import { ReviewSortType as ReviewSortEnum } from '../../../domain/usecases';

export { ReviewSortType } from '../../../domain/usecases';

registerEnumType(ReviewSortEnum, {
  name: 'ReviewSortType',
  description: 'Review sort type enum',
});
