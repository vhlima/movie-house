import { Field, ObjectType } from 'type-graphql';

import { ListEntity, MovieEntity } from './index';

@ObjectType('ListPreview')
export class ListPreviewEntity extends ListEntity {
  @Field(() => [MovieEntity])
  movies: MovieEntity[];
}
