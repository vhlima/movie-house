import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from './user.interface';

import PostgresTimestamps from './timestamps';

@Entity('users_providers')
export default class UserProvider extends PostgresTimestamps {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'UserId',
  })
  user: User;

  @Column()
  provider: string;

  @Column({ name: 'provider_id' })
  providerId: string;
}
