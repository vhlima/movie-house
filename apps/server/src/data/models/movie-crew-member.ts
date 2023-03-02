import { MoviePersonModel } from './movie-person';

/* eslint-disable camelcase */
export type MemberCrewMemberModel = MoviePersonModel & {
  credit_id: string;

  department: string;

  job: number;
};
