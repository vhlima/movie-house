import type { FindReviewQuery } from '../../../graphql';

import PageContent from '../../../components/PageContent';
import BackdropImage from '../../../components/BackdropImage';
import MovieInfos from '../../../components/movie/MovieInfos';
import ReviewBody from '../../../components/review/ReviewBody';
import PostCommentaries from '../../../components/PostCommentaries';

export interface MovieReviewViewProps {
  review: FindReviewQuery['review'];
}

const MovieReviewView: React.FC<MovieReviewViewProps> = ({ review }) => {
  const { movie } = review;

  return (
    <BackdropImage src={movie.backdropUrl} alt="Movie review backdrop">
      <PageContent>
        <MovieInfos movie={movie} />

        <div className="flex flex-col gap-2 mt-2">
          <ReviewBody review={review} />

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

        <PostCommentaries postId={review.post.id} />
      </PageContent>
    </BackdropImage>
  );
};

export default MovieReviewView;
