import { Field, ObjectType } from 'type-graphql';

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Timestamps } from './timestamps';

import { PreMadeListType } from '../../main/graphql/enums';

import { UserEntity } from './user';

@ObjectType()
@Entity('pre_made_lists')
export class PreMadeListEntity extends Timestamps {
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

  @Field(() => PreMadeListType)
  @Column({ type: 'enum', enum: PreMadeListType })
  listType: PreMadeListType;
}
