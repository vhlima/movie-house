import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export default class CommentaryArgs {
  @Field()
  userId: string;

  @Field()
  referenceId: string;

  @Field()
  body: string;
}
