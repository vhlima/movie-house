import { Field, ObjectType } from 'type-graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Timestamps } from './timestamps';
import { UserEntity } from './user';

@ObjectType('Follow')
@Entity('followings')
export class FollowEntity extends Timestamps {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'follower_id' })
  followerId: string;

  @Field(() => UserEntity)
  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'follower_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'FollowerId',
  })
  follower: UserEntity;

  @Column({ name: 'followed_id' })
  followedId: string;

  @Field(() => UserEntity)
  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'followed_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'FollowedId',
  })
  followed: UserEntity;
}
