import type { ReviewData } from '../../../graphql/Review/types';

import MovieHeader from '../../movies/view/Header';

import ReviewBody from './components/ReviewBody';

import CommentarySection from '../../../components/CommentarySection';

export interface MovieReviewProps {
  review: ReviewData;
}

const MovieReview: React.FC<MovieReviewProps> = ({ review }) => (
  <>
    <MovieHeader movie={review.movie}>
      <ReviewBody review={review} preview={false} />
    </MovieHeader>

    <CommentarySection postId={review.id} />
  </>
);

export default MovieReview;
