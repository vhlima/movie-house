import { PageNotFoundError } from '../../domain/errors';

import { TmDBMovieListModel } from '../models';

const MAX_PAGES_LIMIT = 500;

export class GetTmDBMoviePaginationService {
  async handle(pagination: TmDBMovieListModel | null) {
    if (!pagination) {
      throw new PageNotFoundError();
    }

    const {
      page,
      results,
      total_pages: totalPages,
      total_results: totalCount,
    } = pagination;

    const maxPages =
      totalPages < MAX_PAGES_LIMIT ? totalPages : MAX_PAGES_LIMIT;

    return {
      totalCount,
      totalPages: maxPages,
      pageInfo: {
        currentPage: page,
        hasNextPage: page < maxPages,
        hasPreviousPage: page > 1,
      },
      edges: results.map(movie => ({
        node: {
          id: movie.id,
          adult: movie.adult,
          genreIds: movie.genre_ids,
          originalLanguage: movie.original_language,
          originalTitle: movie.original_title,
          overview: movie.overview,
          popularity: movie.popularity,
          title: movie.title,
          video: movie.video,
          voteAverage: movie.vote_average,
          voteCount: movie.vote_count,
          backdropPath: movie.backdrop_path,
          posterPath: movie.poster_path,
          releaseDate: movie.release_date,
        },
      })),
    };
  }
}
