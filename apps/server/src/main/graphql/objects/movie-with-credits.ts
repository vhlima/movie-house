import { Field, ObjectType } from 'type-graphql';

import { MovieCreditsEntity, MovieEntity } from '../../../infra/entities';

@ObjectType()
export class MovieWithCredits extends MovieEntity {
  @Field(() => MovieCreditsEntity)
  credits: MovieCreditsEntity;
}
