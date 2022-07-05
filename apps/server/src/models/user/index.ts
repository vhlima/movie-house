import { getModelForClass } from '@typegoose/typegoose';

import User from './User';

import Review from './Review';

export const UserModel = getModelForClass(User);

export const ReviewModel = getModelForClass(Review);
