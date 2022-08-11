import { Field, ObjectType, Root } from 'type-graphql';

import { Column } from 'typeorm';

@ObjectType()
export default class FavoriteMovie {
  @Field()
  @Column()
  readonly id: string;

  @Field()
  @Column({ name: 'original_title' })
  readonly originalTitle: string;

  @Field()
  @Column({ name: 'poster_path' })
  readonly posterPath: string;

  @Field()
  posterUrl(@Root('poster_path') posterPath: string): string {
    return `https://image.tmdb.org/t/p/w500${posterPath}`;
  }
}
