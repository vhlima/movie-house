import { Field, ObjectType } from 'type-graphql';

import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

@ObjectType()
export default abstract class PostgresTimestamps {
  @Field(() => Date)
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp with time zone',
  })
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp with time zone',
  })
  updatedAt: Date;
}
