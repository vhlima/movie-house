import type { ReviewResponse } from '../../../types/review';

import MovieHeader from '../../movies/view/Header';

import UserMovieReviewBody from './components/Body';

import CommentarySection from '../../../components/CommentarySection';

export interface UserMovieReviewProps {
  review: ReviewResponse;
}

const UserMovieReview: React.FC<UserMovieReviewProps> = ({ review }) => (
  <>
    <MovieHeader movie={review.movie}>
      <UserMovieReviewBody review={review} preview={false} />
    </MovieHeader>

    <CommentarySection postId={review._id} />
  </>
);

export default UserMovieReview;
