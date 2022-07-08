import { Field, InputType } from 'type-graphql';

import { prop } from '@typegoose/typegoose';

@InputType()
class FavoriteMovieInput {
  @Field()
  @prop({ required: true })
  movieId: string;

  @Field()
  @prop({ required: true })
  coverUrl: string;
}

export default FavoriteMovieInput;
