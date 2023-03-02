import { registerEnumType } from 'type-graphql';

import { MovieReferenceSortType as MovieReferenceSortTypeEnum } from '../../../domain/entities';

export { MovieReferenceSortType } from '../../../domain/entities';

registerEnumType(MovieReferenceSortTypeEnum, {
  name: 'MovieReferenceSortType',
  description: 'MovieReferenceSortType type enum',
});
