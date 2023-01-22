import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export default class LikeArgs {
  @Field()
  rootId: string;

  @Field({ nullable: true })
  referenceId?: string;
}
