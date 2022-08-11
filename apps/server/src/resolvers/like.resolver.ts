import { Resolver, Mutation, Arg, Args, Query } from 'type-graphql';

import { findUserById } from '../controllers/user.controller';

import Like from '../entities/postgres/like.interface';

import LikeArgs from '../entities/types/args/like.args';

// TODO change all resolver classes to export default

@Resolver(() => Like)
export default class LikeResolver {
  @Query(() => Like, { nullable: true })
  async findLike(@Args() { userId, referenceId, likeType }: LikeArgs) {
    // const like = await LikeModel.findOne({
    //   user: userId,
    //   referenceId,
    //   likeType,
    // });
    // return like;
  }

  @Mutation(() => Boolean)
  async likeOrDislike(@Args() { userId, ...args }: LikeArgs) {
    // const user = await findUserById(userId);
    // // if(likeType === LikeType.COMMENTARY) {}
    // // TODO check if is valid commentary, movie or post to like
    // const likeExists = await LikeModel.findOne({ user: userId, ...args });
    // if (likeExists) {
    //   await LikeModel.deleteOne({ user: userId, ...args });
    //   return false;
    // }
    // await LikeModel.create({ user, ...args });
    // // user.likes.push(like)
    // // await user.save();
    // return true;
  }

  @Mutation(() => String)
  async dislike(@Arg('likeId') likeId: string) {
    // const like = await LikeModel.findByIdAndDelete(likeId);
    // if (!like) {
    //   throw new Error('User didnt liked that');
    // }
    // return 'Dislike with success';
  }
}
