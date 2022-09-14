import { Field, Int, ObjectType } from 'type-graphql';

import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { IsInt, Max, Min } from 'class-validator';

import User from './user.interface';

import PostgresTimestamps from './timestamps.interface';

@ObjectType()
@Entity('users_movie_ratings')
export default class MovieRate extends PostgresTimestamps {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Field(() => User)
  @ManyToOne(() => User)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'UserId',
  })
  user: User;

  @Column({ name: 'movie_id' })
  @IsInt()
  movieId: number;

  @Field(() => Int)
  @Column()
  @IsInt()
  @Min(0)
  @Max(10)
  rating: number;
}
