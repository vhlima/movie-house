/* eslint-disable camelcase */
export type MoviePersonModel = {
  id: number;

  adult: boolean;

  gender: number;

  known_for_department: string;

  profile_path?: string;

  name: string;

  original_name: string;

  popularity: number;
};
