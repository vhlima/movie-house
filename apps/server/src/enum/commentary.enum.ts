import { registerEnumType } from 'type-graphql';

enum CommentaryType {
  ROOT = 'ROOT',
  REPLY = 'REPLY',
}

registerEnumType(CommentaryType, {
  name: 'CommentaryType',
  description: 'Distinguish commentary',
});

export default CommentaryType;
