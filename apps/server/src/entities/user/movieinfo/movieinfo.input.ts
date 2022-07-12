import { Field, Float, InputType } from 'type-graphql';

import { prop } from '@typegoose/typegoose';

import ReviewInput from '../review/review.input';

@InputType()
export default class MovieInfoInput {
  @Field()
  @prop()
  userId: string;

  @Field()
  @prop({ required: false })
  movieId: string;

  @Field(() => Float, { nullable: true, defaultValue: 0 })
  @prop({ required: false })
  rating?: number;

  @Field({ nullable: true, defaultValue: false })
  @prop({ required: false })
  liked?: boolean;

  @Field({ nullable: true, defaultValue: false })
  @prop({ required: false })
  watched?: boolean;

  @Field(() => ReviewInput, { nullable: true })
  @prop({ type: () => ReviewInput, required: false })
  review?: ReviewInput;
}
