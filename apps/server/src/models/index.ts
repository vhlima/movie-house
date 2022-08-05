import { getModelForClass } from '@typegoose/typegoose';

import User from '../entities/user.interface';

import Review from '../entities/review.interface';

import Like from '../entities/like.interface';

import Reply from '../entities/commentary/reply.interface';

import Commentary from '../entities/commentary/commentary.interface';

export const UserModel = getModelForClass(User, {
  schemaOptions: { timestamps: true },
});

export const ReviewModel = getModelForClass(Review, {
  schemaOptions: { timestamps: true },
});

export const LikeModel = getModelForClass(Like, {
  schemaOptions: { timestamps: true },
});

export const CommentaryModel = getModelForClass(Commentary, {
  schemaOptions: { timestamps: true },
});

export const ReplyModel = getModelForClass(Reply, {
  schemaOptions: { timestamps: true },
});
