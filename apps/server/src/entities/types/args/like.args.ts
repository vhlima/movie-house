import { ArgsType, Field } from 'type-graphql';

import LikeType from '../../../enum/like.enum';

@ArgsType()
export default class LikeArgs {
  @Field()
  postId: string;

  @Field({ nullable: true })
  commentaryId?: string;

  @Field(() => LikeType)
  likeType: LikeType;
}
