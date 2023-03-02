import { registerEnumType } from 'type-graphql';

import { CommentarySortType as CommentarySortEnum } from '../../../domain/usecases';

export { CommentarySortType } from '../../../domain/usecases';

registerEnumType(CommentarySortEnum, {
  name: 'CommentarySortType',
  description: 'Review sort type enum',
});
