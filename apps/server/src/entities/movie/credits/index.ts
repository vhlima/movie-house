import { Field, ObjectType } from 'type-graphql';

import { Column } from 'typeorm';

import Cast from './cast.interface';

import Crew from './crew.interface';

@ObjectType()
export default class Credits {
  @Field()
  @Column()
  readonly id: string;

  @Field(() => [Cast])
  @Column(() => Cast)
  cast: Cast[];

  @Field(() => [Crew])
  @Column(() => Crew)
  crew: Crew[];
}
