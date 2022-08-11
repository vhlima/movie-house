import { Field, Int, ObjectType } from 'type-graphql';
import { Column } from 'typeorm';

import Person from './person.interface';

@ObjectType()
export default class Crew extends Person {
  @Field()
  @Column({ name: 'credit_id' })
  readonly creditId: string;

  @Field()
  @Column()
  readonly department: string;

  @Field(() => Int)
  @Column()
  readonly job: number;
}
