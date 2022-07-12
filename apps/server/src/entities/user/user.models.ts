import { getModelForClass } from '@typegoose/typegoose';

import User from './user.interface';

import Review from './review/review.interface';

export const UserModel = getModelForClass(User);

export const ReviewModel = getModelForClass(Review);
