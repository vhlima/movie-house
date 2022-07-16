import { ArgsType, Field } from 'type-graphql';

import LikeType from '../../../enum/like.enum';

@ArgsType()
export default class LikeArgs {
  @Field()
  userId: string;

  @Field()
  referenceId: string;

  @Field({ nullable: true })
  rootId?: string;

  @Field(() => LikeType)
  likeType: LikeType;
}
