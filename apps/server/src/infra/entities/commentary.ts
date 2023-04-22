import { Field, Int, ObjectType } from 'type-graphql';

import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { UserEntity, PostEntity } from './index';

import { Timestamps } from './timestamps';

@ObjectType('Commentary')
@Entity({ database: 'commentaries' })
export class CommentaryEntity extends Timestamps {
  @Field(() => String)
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

  @Field()
  @Column({ name: 'post_id' })
  postId: string;

  @ManyToOne(() => PostEntity, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'post_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'PostId',
  })
  post: PostEntity;

  @Field()
  @Column()
  content: string;

  @Field(() => Int)
  replyCount: number;
}
