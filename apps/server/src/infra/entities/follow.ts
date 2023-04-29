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
@Entity({ name: 'followings' })
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

  @Column({ name: 'following_id' })
  followingId: string;

  @Field(() => UserEntity)
  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'following_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'FollowingId',
  })
  following: UserEntity;
}
