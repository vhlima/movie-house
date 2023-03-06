import { registerEnumType } from 'type-graphql';

import { CommentarySortType } from '../../../data/enums';

export { CommentarySortType };

registerEnumType(CommentarySortType, {
  name: 'CommentarySortType',
  description: 'Review sort type enum',
});
