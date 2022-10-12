import { Field, Int, ObjectType, Root } from 'type-graphql';

import { Column, Entity } from 'typeorm';

import { UserListCustomMovieRepository } from '../../../../repositories';

import Movie from '../../movie';

import Post from '../../post.interface';

@ObjectType()
@Entity('users_lists')
export default class UserListCustom extends Post {
  @Field()
  @Column()
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  backgroundImageUrl?: string;

  @Field({ defaultValue: false })
  @Column({ nullable: true, default: false })
  isPrivate: boolean;

  @Field(() => [Movie])
  async featuredMovies(@Root() list: UserListCustom) {
    const listMovies = await UserListCustomMovieRepository.find({
      where: { listId: list.id } as any,
      take: 5,
    });

    return listMovies.map(lm => lm.movie);
  }

  @Field(() => Int)
  async totalCount(@Root() list: UserListCustom) {
    const listMoviesCount = await UserListCustomMovieRepository.countBy({
      listId: list.id,
    });

    return listMoviesCount;
  }
}
