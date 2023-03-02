import { Movie } from './index';

export enum MovieReferenceSortType {
  GENRE = 'GENRE',
  DECADE = 'DECADE',
  YEAR = 'YEAR',
  // SERVICE = 'SERVICE',
  // POPULARITY_YEAR = 'POPULARITY_YEAR',
  // POPULARITY_ASC = 'POPULARITY_ASC',
  // POPULARITY_DESC = 'POPULARITY_DESC',
  RELEASE_DATE_ASC = 'RELEASE_DATE_ASC',
  RELEASE_DATE_DESC = 'RELEASE_DATE_DESC',
}

export class MovieReference {
  id: string;

  referenceId: string;

  movieId: number;

  movie: Movie;
}