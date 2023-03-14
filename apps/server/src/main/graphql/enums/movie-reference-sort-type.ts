import { registerEnumType } from 'type-graphql';

import { MovieReferenceSortType } from '../../../data/enums';

export { MovieReferenceSortType };

registerEnumType(MovieReferenceSortType, {
  name: 'MovieReferenceSortType',
  description: 'MovieReferenceSortType type enum',
});
