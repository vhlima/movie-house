import { Field, ID, ObjectType } from 'type-graphql';

import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

import Timestamps from '../timestamps.interface';

@ObjectType()
@Entity('users')
export default class User extends Timestamps {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Field()
  @Column()
  username: string;

  @Field({ nullable: true })
  @Column({ name: 'real_name', nullable: true })
  realName?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  biography?: string;

  @Field({ nullable: true })
  @Column({
    name: 'profile_picture_url',
    default:
      'https://a.ltrbxd.com/resized/avatar/twitter/4/9/0/4/5/7/shard/http___pbs.twimg.com_profile_images_1001935353740177414_9ZQ0Noe4-0-80-0-80-crop.jpg?k=9c800e12d6',
    nullable: true,
  })
  profilePictureUrl: string;

  // @Field(() => [FavoriteMovie])
  // @prop({
  //   type: () => FavoriteMovie,
  //   required: true,
  //   default: [],
  // })
  // favoriteMovies: FavoriteMovie[];

  // @Field(() => [Review])
  // @prop({
  //   ref: () => Review,
  //   required: true,
  //   default: [],
  // })
  // reviews: Ref<Review>[];

  // @Field(() => [Rate])
  // @prop({ type: () => Rate, required: true, default: [] })
  // ratings: Rate[];

  // @Field(() => [Movie])
  // @prop({ type: Movie, require: true, default: [] })
  // watchlist: Movie[];

  // @Field(() => [User])
  // @prop({
  //   ref: () => User,
  //   required: true,
  //   default: [],
  // })
  // followers: Ref<User>[];

  // @Field(() => [User])
  // @prop({
  //   ref: () => User,
  //   required: true,
  //   default: [],
  // })
  // following: Ref<User>[];
}
