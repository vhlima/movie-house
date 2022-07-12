import { Field, ObjectType } from 'type-graphql';

import { prop } from '@typegoose/typegoose';

@ObjectType()
export default class Review {
  // @Field(() => User)
  // @prop({
  //   ref: () => User,
  //   required: true,
  // })
  // readonly user: Ref<User>;

  @Field()
  @prop()
  body: string;
}
