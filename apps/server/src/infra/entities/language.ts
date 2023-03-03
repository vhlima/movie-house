import { Field, ObjectType } from 'type-graphql';

import { Column } from 'typeorm';

import { Language } from '../../domain/entities';

@ObjectType('Language')
export class LanguageEntity implements Language {
  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  englishName: string;

  @Field()
  @Column()
  iso639: string;
}
