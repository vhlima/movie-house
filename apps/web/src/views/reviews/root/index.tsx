import type { Review } from '../../../graphql';

import StarIcon from '../../../components/StarIcon';

import PageContent from '../../../components/PageContent';

import BackdropImage from '../../../components/BackdropImage';

import MovieInfos from '../../../components/movie/MovieInfos';

import ReviewBody from '../../../components/review/ReviewBody';

import CommentarySection from '../../../components/CommentarySection';

export interface MovieReviewViewProps {
  review: Pick<Review, 'id' | 'author' | 'body' | 'movie' | 'createdAt'>;
}

const MovieReviewView: React.FC<MovieReviewViewProps> = ({
  review: { id, author, movie, body, createdAt },
}) => (
  <BackdropImage src={movie.backdropUrl}>
    <PageContent>
      <MovieInfos movie={movie}>
        <div className="flex mt-auto">
          {Array.from({ length: 10 })
            .map((_, index) => index + 1)
            .map(n => (
              <StarIcon key={`movie-review-star-${n}`} fill={n <= 3} />
            ))}
        </div>
      </MovieInfos>

      <div className="flex flex-col gap-2 mt-2">
        <ReviewBody body={body} author={author} createdAt={createdAt} />

        {/* {data && (
          <div className="flex gap-2">
            <LikeButton
              rootId={reviewId}
              likeCount={0}
              hasLiked={likes.filter(usr => usr.id !== data.user.id).length > 0}
            />

            <CommentaryCount count={commentaryCount} />
          </div>
        )} */}
      </div>

      <CommentarySection postId={id} />
    </PageContent>
  </BackdropImage>
);

export default MovieReviewView;
