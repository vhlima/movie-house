import { Field, ObjectType } from 'type-graphql';

import { Column } from 'typeorm';

/* eslint-disable camelcase */

@ObjectType()
export default class Language {
  @Field()
  @Column()
  readonly name: string;

  @Field({ name: 'englishName' })
  @Column()
  readonly english_name: string;

  @Field({ name: 'iso6391' })
  @Column()
  readonly iso_639_1: string;
}
