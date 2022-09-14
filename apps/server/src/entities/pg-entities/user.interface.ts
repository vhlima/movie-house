import { Field, ID, ObjectType } from 'type-graphql';

import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

import PostgresTimestamps from './timestamps.interface';

@ObjectType()
@Entity('users')
export default class User extends PostgresTimestamps {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Field()
  @Column()
  username: string;

  @Field({ nullable: true })
  @Column({ name: 'real_name', nullable: true })
  realName?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  biography?: string;

  @Field({
    nullable: true,
  })
  @Column({
    name: 'profile_picture_url',
    nullable: true,
  })
  profilePictureUrl?: string;
}
