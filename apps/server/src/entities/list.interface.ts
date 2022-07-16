import { Field, ObjectType } from 'type-graphql';

import { prop } from '@typegoose/typegoose';

import Movie from './movie.interface';

import Post from './post.interface';

// TODO maybe one separate document for movies

/*
  one movie per document

  {
    listId: id;
    movie: Movie;
  }
*/

@ObjectType()
export default class List extends Post {
  @Field(() => [Movie])
  @prop({ type: () => Movie })
  movies: Movie[];
}
