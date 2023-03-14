import { Field, ObjectType } from 'type-graphql';

import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { UserEntity, CommentaryEntity } from './index';

import { Timestamps } from './timestamps';

@ObjectType('Reply')
@Entity('replies', { name: 'Reply' })
export class ReplyEntity extends Timestamps {
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
  @Column({ name: 'commentary_id' })
  commentaryId: string;

  @ManyToOne(() => CommentaryEntity, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'commentary_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'CommentaryId',
  })
  commentary: CommentaryEntity;

  @Field()
  @Column()
  content: string;
}
