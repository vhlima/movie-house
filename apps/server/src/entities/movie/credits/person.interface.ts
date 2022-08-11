import { Field, Float, Int, ObjectType, Root } from 'type-graphql';

import { Column } from 'typeorm';

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

  @Field()
  @Column({ name: 'known_for_department' })
  knownForDepartment: string;

  @Field({ nullable: true })
  @Column({ name: 'profile_path', nullable: true })
  profilePath?: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ name: 'original_name' })
  originalName: string;

  @Field(() => Float)
  @Column()
  popularity: number;

  @Field()
  profilePictureUrl(@Root('profilePath') profilePath: string): string {
    if (!profilePath) return '';

    return `https://image.tmdb.org/t/p/w500/${profilePath}`;
  }
}
