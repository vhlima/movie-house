import { getDecade } from 'date-fns';

export function sortMovieListByGenre(genres: number[]) {
  if (genres.length === 0) {
    return undefined;
  }

  return {
    'movie.genres': {
      $elemMatch: { id: { $in: genres } },
    },
  };
}

export function sortMovieListByDecade(decade: string) {
  if (Number.isNaN(decade)) {
    return undefined;
  }

  const currentDecade = getDecade(new Date());

  const decadeNumber = parseInt(decade, 10);

  if (decadeNumber < 1870 || decadeNumber > currentDecade) {
    return undefined;
  }

  return {
    'movie.release_date': {
      $gte: new Date(`${decadeNumber}-01-01T00:00:00.000Z`),
      $lte: new Date(`${decadeNumber + 9}-12-31T23:59:59.999Z`),
    },
  };
}

export function sortMovieListByYear(year: number) {
  if (year < 1870 || year >= 3000) {
    return undefined;
  }

  return {
    'movie.release_date': {
      $gte: new Date(`${year}-01-01T00:00:00.000Z`),
      $lte: new Date(`${year}-12-31T23:59:59.999Z`),
    },
  };
}
