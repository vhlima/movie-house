import type { ReviewResponse } from '../../../types/review';

import MovieHeader from '../../movies/view/Header';

import ReviewBody from './components/ReviewBody';

import CommentarySection from '../../../components/CommentarySection';

export interface MovieReviewProps {
  review: ReviewResponse;
}

const MovieReview: React.FC<MovieReviewProps> = ({ review }) => (
  <>
    <MovieHeader movie={review.movie}>
      <ReviewBody review={review} preview={false} />
    </MovieHeader>

    <CommentarySection postId={review._id} />
  </>
);

export default MovieReview;
