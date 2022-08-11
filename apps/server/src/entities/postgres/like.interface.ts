import { Field, ID, ObjectType } from 'type-graphql';

import {
  Column,
  JoinColumn,
  ManyToOne,
  ObjectID,
  PrimaryGeneratedColumn,
} from 'typeorm';

import type { ColumnEmbeddedOptions } from 'typeorm/decorator/options/ColumnEmbeddedOptions';

import User from './user.interface';

@ObjectType()
export default class Like {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Field(() => User)
  @ManyToOne(() => User)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'user_id',
  })
  user: User;

  @Field(() => ID)
  @Column()
  rootId: string;

  @Field(() => ID, { nullable: true })
  // TODO find way to not have this cast
  @Column(() => ObjectID, { nullable: true } as ColumnEmbeddedOptions)
  referenceId?: string;
}
