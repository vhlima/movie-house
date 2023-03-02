import { Review, User } from '../entities';

export type CreateReviewHandleProps = {
  session?: User;
  movieId: number;
  content: string;
};

export interface CreateReview {
  handle: (props: CreateReviewHandleProps) => Promise<Review>;
}
