import { MoviePerson } from './movie-person';

export class MovieCharacter extends MoviePerson {
  castId: number;

  creditId: string;

  character: string;

  order: number;
}
