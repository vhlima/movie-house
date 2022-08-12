import { ObjectType } from 'type-graphql';

import { Entity } from 'typeorm';

import MovieList from './movieList.interface';

@ObjectType()
@Entity('favorite_movies')
export default class FavoriteMovie extends MovieList {}
