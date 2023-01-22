import { Field, ObjectType } from 'type-graphql';

import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

@ObjectType()
export default abstract class MongoTimestamps {
  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Date;
}
