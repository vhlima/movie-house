import { Field, ObjectType } from 'type-graphql';

import { prop } from '@typegoose/typegoose';

import Cast from './cast.interface';

import Crew from './crew.interface';

/* eslint-disable camelcase */

@ObjectType()
export default class Credits {
  @Field()
  @prop()
  readonly id: string;

  @Field(() => [Cast])
  @prop({ type: () => Cast })
  readonly cast: Cast[];

  @Field(() => [Crew])
  @prop({ type: () => Crew })
  readonly crew: Crew[];
}
