import { MovieGenre, Company, Language, MovieCredits } from './index';

export class Movie {
  id: number;

  imdbId: string;

  originalLanguage: string;

  originalTitle: string;

  overview: string;

  runtime: number;

  voteAverage: number;

  posterPath?: string;

  posterUrl: string;

  backdropPath?: string;

  backdropUrl: string;

  releaseDate?: Date;

  genres: MovieGenre[];

  productionCompanies: Company[];

  spokenLanguages: Language[];

  credits?: MovieCredits;
}
