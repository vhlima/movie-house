import { Field, ID, Int, ObjectType } from 'type-graphql';

import { PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from 'typeorm';

import User from '../user.interface';

import Timestamps from '../../timestamps.interface';

@ObjectType({ isAbstract: true })
export default abstract class BaseCommentary extends Timestamps {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Field(() => ID)
  @Column({ name: 'post_id' })
  postId: string;

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

  @Field()
  @Column()
  body: string;

  @Field(() => Int)
  async likeCount() {
    return 0;
  }
}
