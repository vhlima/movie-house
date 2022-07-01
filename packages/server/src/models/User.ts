import { Field, ID, ObjectType } from 'type-graphql';

import { prop, getModelForClass, Ref } from '@typegoose/typegoose';

@ObjectType()
export default class User {
  @Field(() => ID)
  @prop({ type: () => String, required: true, unique: true })
  id: string;

  @Field()
  @prop({ type: () => String, required: true })
  username: string;

  @Field()
  @prop({ type: () => String, required: true })
  realName: string;

  @Field()
  @prop({ type: () => String })
  profilePicture?: string;

  @Field(() => [User])
  @prop({ ref: () => User, default: [] })
  followers?: Ref<User>[];

  @Field(() => [User])
  @prop({ ref: () => User, default: [] })
  following?: Ref<User>[];
}

export const UserModel = getModelForClass(User);
