import type { Review } from '../../../graphql';

import MovieHeader from '../../movies/view/Header';

import PageContent from '../../../components/PageContent';

import MovieRatingStar from '../../movies/components/RatingStar';

import ReviewText from '../../../components/reviews/components/Text';

import CommentarySection from '../../../components/CommentarySection';

export interface MovieReviewViewProps {
  review: Review;
}

const MovieReviewView: React.FC<MovieReviewViewProps> = ({ review }) => (
  <>
    <MovieHeader movie={review.movie} basicInfo>
      <div className="flex mb-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
          <MovieRatingStar
            key={n}
            color={n <= 3 ? 'blue' : 'grey'}
            checked={n <= 3}
          />
        ))}
      </div>
    </MovieHeader>

    <PageContent>
      <ReviewText review={review} />
    </PageContent>

    <CommentarySection postId={review.id} />
  </>
);

export default MovieReviewView;
