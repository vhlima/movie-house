import { Field, ID, ObjectType } from 'type-graphql';

import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

import PostgresTimestamps from './timestamps.interface';

@Entity('users_providers')
export default class UserProvider extends PostgresTimestamps {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column()
  provider: string;

  @Column({ name: 'provider_id' })
  providerId: string;
}
