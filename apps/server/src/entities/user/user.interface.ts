import mongoose from 'mongoose';

import { Field, ID, ObjectType } from 'type-graphql';

import { prop, Ref } from '@typegoose/typegoose';

import FavoriteMovie from './favorites/favorites.interface';

import MovieInfo from './movieinfo/movieinfo.interface';

@ObjectType()
export default class User {
  @Field(() => ID)
  @prop({
    type: () => mongoose.Schema.Types.ObjectId,
    auto: true,
  })
  readonly _id: string;

  @Field()
  @prop()
  username: string;

  @Field()
  @prop()
  realName: string;

  @Field({ nullable: true })
  @prop({ required: false, default: '' })
  biography: string;

  @Field({ nullable: true })
  @prop({
    required: false,
    default:
      'https://a.ltrbxd.com/resized/avatar/twitter/4/9/0/4/5/7/shard/http___pbs.twimg.com_profile_images_1001935353740177414_9ZQ0Noe4-0-80-0-80-crop.jpg?k=9c800e12d6',
  })
  profilePicture?: string;

  @Field(() => [FavoriteMovie])
  @prop({
    type: () => FavoriteMovie,
    required: true,
    default: [],
  })
  favoriteMovies: FavoriteMovie[];

  // @Field(() => [Review])
  // @prop({
  //   type: () => Review,
  //   required: true,
  //   default: [],
  // })
  // reviews: Review[];

  @Field(() => [MovieInfo])
  @prop({ type: () => MovieInfo, required: true, default: [] })
  moviesInfo: MovieInfo[];

  @Field(() => [User])
  @prop({
    ref: () => User,
    required: true,
    default: [],
  })
  followers: Ref<User>[];

  @Field(() => [User])
  @prop({
    ref: () => User,
    required: true,
    default: [],
  })
  following: Ref<User>[];
}
