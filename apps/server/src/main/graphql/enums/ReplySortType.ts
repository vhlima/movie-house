import { registerEnumType } from 'type-graphql';

import { ReplySortType as ReplySortEnum } from '../../../domain/usecases';

export { ReplySortType } from '../../../domain/usecases';

registerEnumType(ReplySortEnum, {
  name: 'ReplySortType',
  description: 'Reply sort type enum',
});
