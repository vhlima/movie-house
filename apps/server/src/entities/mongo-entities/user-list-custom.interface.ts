import { Field, ObjectType, Root } from 'type-graphql';

import { Column, Entity } from 'typeorm';

import { UserListCustomMovieRepository } from '../../repositories';

import Movie from './movie';

import Post from './post.interface';

@ObjectType()
@Entity('users_lists')
export default class UserListCustom extends Post {
  @Field()
  @Column()
  name: string;

  @Field(() => [Movie])
  async movies(@Root() list: UserListCustom) {
    const listMovies = await UserListCustomMovieRepository.findBy({
      listId: list.id,
    });

    return listMovies.map(lm => lm.movie);
  }
}
