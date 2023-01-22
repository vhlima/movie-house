import { Field, ID, ObjectType } from 'type-graphql';

import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from './user.interface';

import PostgresTimestamps from './timestamps';

@ObjectType()
@Entity('follows')
export default class Follow extends PostgresTimestamps {
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
    foreignKeyConstraintName: 'UserId',
  })
  user: User;

  @Column({ name: 'target_user_id' })
  targetUserId: string;

  @Field(() => User)
  @ManyToOne(() => User)
  @JoinColumn({
    name: 'target_user_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'TargetUserId',
  })
  targetUser: User;
}
