import { Field, ObjectType } from 'type-graphql';

import { MovieCharacterEntity } from './movie-character';
import { MovieCrewMemberEntity } from './movie-crew-member';

@ObjectType('MovieCredits')
export class MovieCreditsEntity {
  @Field(() => [MovieCharacterEntity])
  cast: MovieCharacterEntity[];

  @Field(() => [MovieCrewMemberEntity])
  crew: MovieCrewMemberEntity[];
}
