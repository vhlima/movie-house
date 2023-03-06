import { registerEnumType } from 'type-graphql';

import { LikeType } from '../../../data/enums';

export { LikeType };

registerEnumType(LikeType, {
  name: 'LikeType',
  description: 'Like type enum',
});
