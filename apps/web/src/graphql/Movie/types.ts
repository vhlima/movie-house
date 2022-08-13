interface MovieCompany {
  id: string;
  name: string;
  logoPath?: string;
  originCountry: string;
}

interface MovieGenre {
  id: string;
  name: string;
}

interface MovieLanguage {
  name: string;
  englishName: string;
  /* eslint-disable-next-line camelcase */
  iso_639_1: string;
}

interface MoviePerson {
  id: number;
  adult: boolean;
  gender: number;
  knownForDepartment: string;
  profilePictureUrl: string;
  name: string;
  originalName: string;
  popularity: number;
}

interface MovieCast extends MoviePerson {
  castId: number;
  creditId: string;
  character: string;
  order: number;
}

interface MovieCrew extends MoviePerson {
  creditId: string;
  department: string;
  job: number;
}

export interface MovieCredits {
  id: string;
  cast: MovieCast[];
  crew: MovieCrew[];
}

export interface MovieData {
  id: string;
  imdbId: string;
  originalLanguage: string;
  originalTitle: string;
  overview: string;
  runtime: number;
  voteAverage: number;
  releaseDate: string;
  genres: MovieGenre[];
  productionCompanies: MovieCompany[];
  spokenLanguages: MovieLanguage[];
  posterUrl: string;
  backdropUrl: string;
  credits: MovieCredits;
}

export interface MovieResponse {
  movie: MovieData;
}

// TODO Change that response
export interface MovieSearchResponse {
  page: number;
  results: MovieData[];
}
