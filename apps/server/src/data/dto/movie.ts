import { Movie } from '../../domain/entities';

import { MovieModel } from '../models';

export class MovieDTO {
  fromModel(movie: MovieModel): Movie {
    return {
      id: movie.id,
      backdropPath: movie.backdrop_path,
      posterPath: movie.poster_path,
      backdropUrl: movie.backdrop_path
        ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
        : '',
      imdbId: movie.imdb_id,
      originalLanguage: movie.original_title,
      originalTitle: movie.original_title,
      overview: movie.overview,
      posterUrl: movie.poster_path
        ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
        : '',
      voteAverage: movie.vote_average,
      releaseDate: movie.release_date,
      runtime: movie.runtime,
      credits: movie.credits
        ? {
            id: movie.credits.id,
            cast: movie.credits.cast.map(cast => ({
              id: cast.id,
              adult: cast.adult,
              castId: cast.cast_id,
              character: cast.character,
              creditId: cast.credit_id,
              gender: cast.gender,
              knownForDepartment: cast.known_for_department,
              name: cast.name,
              order: cast.order,
              originalName: cast.original_name,
              popularity: cast.popularity,
              profilePicturePath: cast.profile_path,
              profilePictureUrl: cast.profile_path
                ? `https://image.tmdb.org/t/p/w500/${cast.profile_path}`
                : '',
            })),
            crew: movie.credits.crew.map(member => ({
              adult: member.adult,
              creditId: member.credit_id,
              department: member.department,
              gender: member.gender,
              id: member.id,
              job: member.job,
              knownForDepartment: member.known_for_department,
              name: member.name,
              originalName: member.original_name,
              popularity: member.popularity,
              profilePicturePath: member.profile_path,
              profilePictureUrl: member.profile_path
                ? `https://image.tmdb.org/t/p/w500/${member.profile_path}`
                : '',
            })),
          }
        : undefined,
      genres: movie.genres.map(genre => ({
        id: genre.id,
        name: genre.name,
      })),
      productionCompanies: movie.production_companies.map(company => ({
        id: company.id,
        name: company.name,
        originCountry: company.origin_country,
        logoPath: company.logo_path,
      })),
      spokenLanguages: movie.spoken_languages.map(language => ({
        name: language.name,
        englishName: language.english_name,
        iso639: language.iso_639_1,
      })),
    };
  }
}
