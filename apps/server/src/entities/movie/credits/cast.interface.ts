import { Field, Int, ObjectType } from 'type-graphql';
import { Column } from 'typeorm';

import Person from './person.interface';

@ObjectType()
export default class Cast extends Person {
  @Field(() => Int)
  @Column({ name: 'cast_id' })
  castId: number;

  @Field()
  @Column({ name: 'credit_id' })
  creditId: string;

  @Field()
  @Column()
  character: string;

  @Field(() => Int)
  @Column()
  order: number;
}
