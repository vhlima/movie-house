import { registerEnumType } from 'type-graphql';

import { PreMadeListType as PreMadeListTypeEnum } from '../../../domain/entities';

export { PreMadeListType } from '../../../domain/entities';

registerEnumType(PreMadeListTypeEnum, {
  name: 'PreMadeListType',
  description: 'PreMadeList type enum',
});
