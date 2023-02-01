import { Field, Int, ObjectType } from 'type-graphql';

import { Column } from 'typeorm';

@ObjectType()
export default class Genre {
  @Field(() => Int)
  @Column()
  readonly id: number;

  @Field()
  @Column()
  readonly name: string;
}
