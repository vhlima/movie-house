import { UserModel, ReviewModel } from '../../models/user';

export const create = async (userId: string, movieId: string, body: string) => {
  const user = await UserModel.findById(userId);

  if (!user) {
    throw new Error('User not found');
  }

  const review = new ReviewModel({ user: userId, movieId, body });

  await review.save();

  user.reviews.push(review);

  await user.save();

  return review;
};

export const remove = async (reviewId: string) => {
  const review = await ReviewModel.findByIdAndDelete(reviewId);

  if (!review) {
    throw new Error('Review not found');
  }
};

export const update = async (reviewId: string, props: { body: string }) => {
  const review = await ReviewModel.findByIdAndUpdate(reviewId, props);

  if (!review) {
    throw new Error('Review not found');
  }

  return review;
};
