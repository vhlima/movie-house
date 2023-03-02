import { MoviePersonModel } from './movie-person';

/* eslint-disable camelcase */
export type MovieCharacterModel = MoviePersonModel & {
  cast_id: number;

  credit_id: string;

  character: string;

  order: number;
};
