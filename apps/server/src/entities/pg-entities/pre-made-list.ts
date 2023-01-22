import { Field, ID, ObjectType } from 'type-graphql';

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import PreMadeListType from '../../enums/PreMadeListType';

import PostgresTimestamps from './timestamps';

import User from './user.interface';

@ObjectType()
@Entity('pre_made_lists')
export default class PreMadeList extends PostgresTimestamps {
  @Field(() => ID)
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

  @Field(() => PreMadeListType)
  @Column({ name: 'list_type', type: 'varchar' })
  listType: PreMadeListType;
}
