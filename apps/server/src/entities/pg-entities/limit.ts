import { Field, Int, ObjectType } from 'type-graphql';

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import LimitType from '../../enums/LimitType';

@ObjectType()
@Entity('limits')
export default class Limit {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @Field(() => LimitType)
  @Column({ name: 'limit_type', type: 'varchar' })
  limitType: LimitType;

  @Field(() => Int)
  @Column()
  limit: number;
}
