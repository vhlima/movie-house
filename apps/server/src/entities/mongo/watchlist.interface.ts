import { ObjectType } from 'type-graphql';

import MovieList from './movieList.interface';

@ObjectType()
export default class WatchlistItem extends MovieList {}
