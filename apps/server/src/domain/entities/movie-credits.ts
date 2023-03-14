import { MovieCharacter } from './movie-character';

import { MovieCrewMember } from './movie-crew-member';

export class MovieCredits {
  id: string;

  cast: MovieCharacter[];

  crew: MovieCrewMember[];
}
