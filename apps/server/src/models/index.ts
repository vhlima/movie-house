import { getModelForClass } from '@typegoose/typegoose';

import User from '../entities/user.interface';

import Review from '../entities/review.interface';

export const UserModel = getModelForClass(User);

export const ReviewModel = getModelForClass(Review);
