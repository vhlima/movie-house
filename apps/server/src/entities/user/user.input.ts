import { Field, InputType } from 'type-graphql';

import { prop } from '@typegoose/typegoose';

@InputType()
class UserInput {
  @Field({ nullable: true })
  @prop({ required: false })
  username?: string;

  @Field({ nullable: true })
  @prop({ required: false })
  realName?: string;

  @Field({ nullable: true, defaultValue: '' })
  @prop({ required: false })
  biography?: string;

  @Field({ nullable: true })
  @prop({
    required: false,
  })
  profilePicture?: string;
}

export default UserInput;
