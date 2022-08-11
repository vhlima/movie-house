import { Field, Float, InputType } from 'type-graphql';

@InputType()
export default class RateInput {
  @Field(() => Float, { nullable: true })
  rating?: number;

  @Field({ nullable: true })
  liked?: boolean;

  @Field({ nullable: true })
  watched?: boolean;
}
