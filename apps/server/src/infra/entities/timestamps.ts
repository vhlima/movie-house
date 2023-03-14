import { Field, ObjectType } from 'type-graphql';

import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

@ObjectType({ isAbstract: true })
export abstract class Timestamps {
  @Field(() => Number)
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp with time zone',
  })
  createdAt: number;

  @Field(() => Number)
  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp with time zone',
  })
  updatedAt: number;
}
