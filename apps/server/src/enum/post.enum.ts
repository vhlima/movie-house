import { registerEnumType } from 'type-graphql';

enum PostType {
  REVIEW = 'REVIEW',
  LIST = 'LIST',
}

registerEnumType(PostType, {
  name: 'PostType',
  description: 'Distinguish each post',
});

export default PostType;
