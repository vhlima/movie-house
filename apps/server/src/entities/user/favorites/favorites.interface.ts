import { Field, ObjectType } from 'type-graphql';

import { prop } from '@typegoose/typegoose';

@ObjectType()
export default class FavoriteMovie {
  @Field()
  @prop({ required: true })
  movieId: string;

  @Field()
  @prop({ required: true })
  coverUrl: string;
}
