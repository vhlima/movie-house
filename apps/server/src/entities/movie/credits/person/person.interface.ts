import { Field, Float, Int, ObjectType, Root } from 'type-graphql';

import { prop } from '@typegoose/typegoose';

/* eslint-disable camelcase */

@ObjectType()
export default class MoviePerson {
  @Field(() => Int)
  @prop()
  id: number;

  @Field()
  @prop()
  adult: boolean;

  @Field(() => Int)
  @prop({ required: false, default: 0 })
  gender: number;

  @Field()
  @prop()
  known_for_department: string;

  @Field({ nullable: true })
  @prop({ required: false })
  profile_path?: string;

  @Field()
  @prop()
  name: string;

  @Field()
  @prop()
  original_name: string;

  @Field(() => Float)
  @prop()
  popularity: number;

  @Field()
  profilePictureUrl(@Root() person: MoviePerson): string {
    if (!person.profile_path) {
      return '';
    }

    return `https://image.tmdb.org/t/p/w500/${person.profile_path}`;
  }
}
