import { Field, ID, ObjectType } from 'type-graphql';

import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { MovieEntity, PostEntity, UserEntity } from './index';

@ObjectType('Review')
@Entity({ name: 'reviews' })
export class ReviewEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'post_id' })
  postId: string;

  @Field(() => PostEntity)
  @OneToOne(() => PostEntity, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'post_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'PostId',
  })
  post: PostEntity;

  @Field(() => UserEntity)
  user: UserEntity;

  @Column({ name: 'movie_id' })
  movieId: number;

  @Field(() => MovieEntity)
  movie: MovieEntity;

  @Field()
  @Column({ name: 'is_pinned', nullable: true, default: false })
  isPinned?: boolean;
}
