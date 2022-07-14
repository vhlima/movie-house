import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export default class FavoriteMovieArgs {
  @Field()
  userId: string;

  @Field()
  movieId: string;
}
