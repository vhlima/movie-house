import { Field, ID, ObjectType, Root } from 'type-graphql';

import { Column, ObjectIdColumn } from 'typeorm';

import { UserRepository } from '../../repositories';

import Movie from '../movie';

import User from '../postgres/user.interface';

import UserNotFoundError from '../../errors/UserNotFound';

import MongoTimestamps from './timestamps.interface';

@ObjectType({ isAbstract: true })
export default abstract class MovieList extends MongoTimestamps {
  @Field(() => ID)
  @ObjectIdColumn({ name: '_id' })
  readonly id: string;

  @Column()
  userId: string;

  @Column()
  movieId: number;

  @Field(() => Movie)
  @Column(() => Movie)
  movie: Movie;

  @Field(() => User)
  async user(@Root('userId') userId: string) {
    const user = await UserRepository.findOneBy({ id: userId });

    if (!user) {
      throw new UserNotFoundError();
    }

    return user;
  }
}
