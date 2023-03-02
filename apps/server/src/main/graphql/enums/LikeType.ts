import { registerEnumType } from 'type-graphql';

import { LikeType as LikeTypeEnum } from '../../../domain/usecases';

export { LikeType } from '../../../domain/usecases';

registerEnumType(LikeTypeEnum, {
  name: 'LikeType',
  description: 'Like type enum',
});
