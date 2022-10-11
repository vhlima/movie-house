import { Field, ObjectType } from 'type-graphql';

import { Column, Entity } from 'typeorm';

// import { UserListMovieRepository } from '../../repositories';

// import Movie from './movie';

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

  // @Field(() => [Movie])
  // async movies(@Root() list: UserListCustom) {
  //   const listMovies = await UserListMovieRepository.findBy({
  //     listId: list.id,
  //   });

  //   return listMovies.map(lm => lm.movie);
  // }
}
