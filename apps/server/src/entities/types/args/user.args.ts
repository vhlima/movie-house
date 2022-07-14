import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export default class UserArgs {
  @Field()
  username: string;
}
