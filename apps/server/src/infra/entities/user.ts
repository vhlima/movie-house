import { Field, ObjectType } from 'type-graphql';

import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

import { User } from '../../domain/entities';

import { Timestamps } from './timestamps';

@ObjectType('User')
@Entity({ name: 'users' })
export class UserEntity extends Timestamps implements User {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'provider_id' })
  providerId: string;

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
