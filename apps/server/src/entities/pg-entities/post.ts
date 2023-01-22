import { Field, ID, Int, ObjectType } from 'type-graphql';

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import User from './user.interface';

import PostgresTimestamps from './timestamps';

/* This class is extended by Review and List */

@ObjectType()
@Entity('posts')
export default class Post extends PostgresTimestamps {
  @Field(() => Int)
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @Column({ name: 'user_id' })
  userId: string;

  // @Field(() => User)
  @ManyToOne(() => User)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'UserId',
  })
  user: User;

  @Field()
  @Column()
  body: string;

  // @Field(() => [Like])
  // likes: Like[];

  // @Field(() => Int)
  // commentaryCount: number;
}
