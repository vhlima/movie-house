import { Field, Int, ObjectType } from 'type-graphql';

import { Column } from 'typeorm';

import Person from './person.interface';

/* eslint-disable camelcase */

@ObjectType()
export default class Crew extends Person {
  @Field({ name: 'creditId' })
  @Column()
  readonly credit_id: string;

  @Field()
  @Column()
  readonly department: string;

  @Field(() => Int)
  @Column()
  readonly job: number;
}
