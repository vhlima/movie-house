import { Field, ID, ObjectType, Root } from 'type-graphql';

import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ListMovieRepository, UserRepository } from '../../repositories';

import Movie from '../mongo-entities/movie';

import Post from './post';

import User from './user.interface';

@ObjectType()
@Entity('lists')
export default class List {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'post_id' })
  postId: number;

  @Field(() => Post)
  @OneToOne(() => Post)
  @JoinColumn({
    name: 'post_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'PostId',
  })
  post: Post;

  @Field()
  @Column()
  name: string;

  @Field({ nullable: true })
  @Column({ name: 'background_image_url', nullable: true })
  backgroundImageUrl?: string;

  @Field()
  @Column({ name: 'is_private', nullable: true, default: false })
  isPrivate?: boolean;

  @Field(() => User)
  async user(@Root() list: List) {
    const user = await UserRepository.findOneBy({ id: list.post.userId });

    return user;
  }

  @Field(() => [Movie])
  async movies(@Root() list: List) {
    const listMovies = await ListMovieRepository.find({
      where: { listId: list.id },
      take: 4,
    });

    return listMovies.map(listMovie => listMovie.movie);
  }
}
