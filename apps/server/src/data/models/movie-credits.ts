import { MovieCharacterModel } from './movie-character';

import { MemberCrewMemberModel } from './movie-crew-member';

export type MovieCreditsModel = {
  readonly id: string;

  cast: MovieCharacterModel[];

  crew: MemberCrewMemberModel[];
};
