import { Field, Float, Int, ObjectType, Root, Ctx } from 'type-graphql';

import { Column } from 'typeorm';

import type { ServerContext } from '../../../types';

import MovieCredits from './credits';

import Genre from './genre.interface';

import Company from './company.interface';

import Language from './language.interface';

import NotFoundError from '../../../errors/NotFound';

/* eslint-disable camelcase */

@ObjectType()
export default class Movie {
  @Field(() => Int)
  @Column()
  readonly id: number;

  @Field({ name: 'imdbId' })
  @Column()
  readonly imdb_id: string;

  @Field({ name: 'originalLanguage' })
  @Column()
  readonly original_language: string;

  @Field({ name: 'originalTitle' })
  @Column()
  readonly original_title: string;

  @Field()
  @Column()
  readonly overview: string;

  @Field(() => Int)
  @Column()
  readonly runtime: number;

  @Field(() => Float, { name: 'voteAverage' })
  @Column()
  readonly vote_average: number;

  @Column()
  readonly poster_path: string;

  @Column()
  readonly backdrop_path: string;

  @Field(() => Date, { name: 'releaseDate', nullable: true })
  @Column({ nullable: true })
  readonly release_date?: Date;

  @Field(() => [Genre])
  @Column()
  readonly genres: Genre[];

  @Field(() => [Company], { name: 'productionCompanies' })
  @Column()
  readonly production_companies: Company[];

  @Field(() => [Language], { name: 'spokenLanguages' })
  @Column()
  readonly spoken_languages: Language[];

  @Field()
  posterUrl(@Root('poster_path') posterPath: string): string {
    if (!posterPath) return '';

    return `https://image.tmdb.org/t/p/w500${posterPath}`;
  }

  @Field()
  backdropUrl(@Root('backdrop_path') backdropPath: string): string {
    if (!backdropPath) return '';

    return `https://image.tmdb.org/t/p/w1280${backdropPath}`;
  }

  @Field(() => MovieCredits)
  async credits(@Ctx() context: ServerContext, @Root('id') movieId: string) {
    const movieCredits = await context.dataSources.tmdb.getCreditsByMovieId(
      movieId,
    );

    if (!movieCredits) {
      throw new NotFoundError(
        `Credits for movie with id [${movieId}] not found`,
      );
    }

    return movieCredits;
  }
}
