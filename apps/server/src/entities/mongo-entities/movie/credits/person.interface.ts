import { Field, Float, Int, ObjectType, Root } from 'type-graphql';

import { Column } from 'typeorm';

/* eslint-disable camelcase */

@ObjectType()
export default class Person {
  @Field(() => Int)
  @Column()
  readonly id: number;

  @Field()
  @Column()
  adult: boolean;

  @Field(() => Int)
  @Column({ nullable: true, default: 0 })
  gender: number;

  @Field({ name: 'knownForDepartment' })
  @Column()
  known_for_department: string;

  @Field({ name: 'profilePath', nullable: true })
  @Column({ nullable: true })
  profile_path?: string;

  @Field()
  @Column()
  name: string;

  @Field({ name: 'originalName' })
  @Column()
  original_name: string;

  @Field(() => Float)
  @Column()
  popularity: number;

  @Field()
  profilePictureUrl(@Root('profile_path') profilePath: string): string {
    if (!profilePath) return '';

    return `https://image.tmdb.org/t/p/w500/${profilePath}`;
  }
}
