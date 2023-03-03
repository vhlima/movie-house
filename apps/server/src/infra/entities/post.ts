import { Field, Int, ObjectType } from 'type-graphql';

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Post } from '../../domain/entities';

import { UserEntity } from './user';

import { Timestamps } from './timestamps';

@ObjectType('Post')
@Entity('posts')
export class PostEntity extends Timestamps implements Post {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Field(() => UserEntity)
  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'UserId',
  })
  user: UserEntity;

  @Field({ nullable: true })
  @Column({ nullable: true })
  content: string;

  @Field(() => Int)
  likeCount: number;

  @Field(() => Int)
  commentaryCount: number;
}
