import { Field, ObjectType } from 'type-graphql';

import { ListEntity, MovieEntity, UserEntity } from './index';

@ObjectType('ListPreview')
export class ListPreviewEntity extends ListEntity {
  @Field(() => [MovieEntity])
  movies: MovieEntity[];

  @Field(() => UserEntity)
  user: UserEntity;
}
