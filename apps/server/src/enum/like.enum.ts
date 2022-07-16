import { registerEnumType } from 'type-graphql';

enum LikeType {
  POST = 'POST',
  MOVIE = 'MOVIE',
  COMMENTARY = 'COMMENTARY',
}

registerEnumType(LikeType, {
  name: 'LikeType',
  description: 'Distinguish like',
});

export default LikeType;
