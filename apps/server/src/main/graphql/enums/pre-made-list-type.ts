import { registerEnumType } from 'type-graphql';

import { PreMadeListType } from '../../../data/enums';

export { PreMadeListType };

registerEnumType(PreMadeListType, {
  name: 'PreMadeListType',
  description: 'PreMadeList type enum',
});
