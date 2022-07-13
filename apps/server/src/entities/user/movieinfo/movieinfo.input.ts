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

  @Field(() => Float, { nullable: true })
  @prop({ required: false })
  rating?: number;

  @Field({ nullable: true })
  @prop({ required: false })
  liked?: boolean;

  @Field({ nullable: true })
  @prop({ required: false })
  watched?: boolean;

  @Field(() => ReviewInput, { nullable: true })
  @prop({ type: () => ReviewInput, required: false })
  review?: ReviewInput;
}
