import { Field, Float, Int, ObjectType, Root } from 'type-graphql';

import { prop } from '@typegoose/typegoose';

/* eslint-disable camelcase */

@ObjectType()
export default class Person {
  @Field(() => Int)
  @prop()
  readonly id: number;

  @Field()
  @prop()
  readonly adult: boolean;

  @Field(() => Int)
  @prop({ required: false, default: 0 })
  readonly gender: number;

  @Field()
  @prop()
  readonly known_for_department: string;

  @Field({ nullable: true })
  @prop({ required: false })
  readonly profile_path?: string;

  @Field()
  @prop()
  readonly name: string;

  @Field()
  @prop()
  readonly original_name: string;

  @Field(() => Float)
  @prop()
  readonly popularity: number;

  @Field()
  profilePictureUrl(@Root('profile_path') profilePath: string): string {
    if (!profilePath) return '';

    return `https://image.tmdb.org/t/p/w500/${profilePath}`;
  }
}
