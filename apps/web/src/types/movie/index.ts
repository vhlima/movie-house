/* eslint-disable camelcase */

interface MovieCompany {
  id: string;
  name: string;
  logo_path?: string;
  origin_country: string;
}

interface MovieGenre {
  id: string;
  name: string;
}

interface MovieLanguage {
  name: string;
  english_name: string;
  iso_639_1: string;
}

export interface MovieResponse {
  id: string;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  runtime: number;
  vote_average: number;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  genres: MovieGenre[];
  production_companies: MovieCompany[];
  spoken_languages: MovieLanguage[];
  posterUrl: string;
  backdropUrl: string;
}

interface MoviePerson {
  id: number;
  adult: boolean;
  gender: number;
  known_for_department: string;
  profilePictureUrl: string;
  name: string;
  original_name: string;
  popularity: number;
}

interface MovieCast extends MoviePerson {
  cast_id: number;
  credit_id: string;
  character: string;
  order: number;
}

interface MovieCrew extends MoviePerson {
  credit_id: string;
  department: string;
  job: number;
}

export interface MovieCreditsResponse {
  id: string;
  cast: MovieCast[];
  crew: MovieCrew[];
}
