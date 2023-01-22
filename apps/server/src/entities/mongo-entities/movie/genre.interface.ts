import { Field, ObjectType } from 'type-graphql';

import { Column } from 'typeorm';

@ObjectType()
export default class Genre {
  @Field()
  @Column()
  readonly id: string;

  @Field()
  @Column()
  readonly name: string;
}
