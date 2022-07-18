import { getModelForClass } from '@typegoose/typegoose';

import User from '../entities/user.interface';

import Review from '../entities/review.interface';

import Like from '../entities/like.interface';

import Reply from '../entities/commentary/reply.interface';

import Commentary from '../entities/commentary/commentary.interface';

export const UserModel = getModelForClass(User);

export const ReviewModel = getModelForClass(Review);

export const LikeModel = getModelForClass(Like);

export const CommentaryModel = getModelForClass(Commentary);

export const ReplyModel = getModelForClass(Reply);
