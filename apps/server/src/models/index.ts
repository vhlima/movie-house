import { getModelForClass } from '@typegoose/typegoose';

import User from '../entities/user.interface';

import Review from '../entities/review.interface';

import Like from '../entities/like.interface';

import Commentary from '../entities/commentary.interface';

export const UserModel = getModelForClass(User);

export const ReviewModel = getModelForClass(Review);

export const LikeModel = getModelForClass(Like);

export const CommentaryModel = getModelForClass(Commentary);
