import { Field, InputType } from 'type-graphql';

@InputType()
class UserFieldsInput {
  @Field({ nullable: true })
  username?: string;

  @Field({ nullable: true })
  realName?: string;

  @Field({ nullable: true })
  biography?: string;

  @Field({ nullable: true })
  profilePicture?: string;
}

export default UserFieldsInput;