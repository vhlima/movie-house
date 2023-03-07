import { MovieGenre } from '../../domain/entities';
import { FindMovieGenres } from '../../domain/usecases';
import { IMovieRepository } from '../contracts';

export class FindMovieGenresService implements FindMovieGenres {
  constructor(private readonly movieRepository: IMovieRepository) {}

  async handle(): Promise<MovieGenre[]> {
    const movieGenres = await this.movieRepository.getMovieGenres();

    return movieGenres;
  }
}
