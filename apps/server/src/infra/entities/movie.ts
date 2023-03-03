import { Field, Float, Int, ObjectType, Root } from 'type-graphql';

import { Column } from 'typeorm';

import { MovieGenreEntity, CompanyEntity, LanguageEntity } from './index';

@ObjectType('Movie')
export class MovieEntity {
  @Field(() => Int)
  @Column()
  readonly id: number;

  @Field()
  @Column()
  imdbId: string;

  @Field()
  @Column()
  originalLanguage: string;

  @Field()
  @Column()
  originalTitle: string;

  @Field()
  @Column()
  overview: string;

  @Field(() => Int)
  @Column()
  runtime: number;

  @Field(() => Float)
  @Column()
  voteAverage: number;

  @Column()
  posterPath: string;

  @Column()
  backdropPath: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  releaseDate?: string;

  @Field(() => [MovieGenreEntity])
  @Column()
  genres: MovieGenreEntity[];

  @Field(() => [CompanyEntity])
  @Column()
  productionCompanies: CompanyEntity[];

  @Field(() => [LanguageEntity])
  @Column()
  spokenLanguages: LanguageEntity[];

  @Field()
  posterUrl: string;

  @Field()
  backdropUrl: string;
}
