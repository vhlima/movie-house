import { Field, Int, ObjectType } from 'type-graphql';
import { Column } from 'typeorm';

import Person from './person.interface';

/* eslint-disable camelcase */

@ObjectType()
export default class Cast extends Person {
  @Field(() => Int, { name: 'castId' })
  @Column()
  cast_id: number;

  @Field({ name: 'creditId' })
  @Column()
  credit_id: string;

  @Field()
  @Column()
  character: string;

  @Field(() => Int)
  @Column()
  order: number;
}
