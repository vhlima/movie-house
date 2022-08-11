import { Field, ObjectType } from 'type-graphql';

import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

@ObjectType()
export default abstract class Timestamps {
  @Field(() => Date)
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
