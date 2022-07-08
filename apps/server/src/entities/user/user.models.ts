import { getModelForClass } from '@typegoose/typegoose';

import Review from '../review/review.interface';

import User from './user.interface';

export const UserModel = getModelForClass(User);

export const ReviewModel = getModelForClass(Review);
