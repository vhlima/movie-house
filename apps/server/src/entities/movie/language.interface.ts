import { Field, ObjectType } from 'type-graphql';

import { Column } from 'typeorm';

@ObjectType()
export default class Language {
  @Field()
  @Column()
  readonly name: string;

  @Field()
  @Column({ name: 'english_name' })
  readonly englishName: string;

  @Field()
  @Column()
  readonly iso_639_1: string;
}
