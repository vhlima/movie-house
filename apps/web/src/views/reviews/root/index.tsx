import type { FindReviewQuery } from '../../../graphql';

import TextShorter from '../../../components/TextShorter';
import PageContent from '../../../components/PageContent';
import BackdropImage from '../../../components/BackdropImage';
import MovieInfos from '../../../components/movie/MovieInfos';
import PostCommentaries from '../../../components/PostCommentaries';
import ReviewHeader from '../../../components/review/ReviewHeader';
import UserProfileLink from '../../../components/user/UserProfileLink';

export interface MovieReviewViewProps {
  review: FindReviewQuery['review'];
}

const MovieReviewView: React.FC<MovieReviewViewProps> = ({ review }) => {
  const { user, movie, post } = review;

  return (
    <BackdropImage src={movie.backdropUrl} alt="Movie review backdrop">
      <PageContent>
        <MovieInfos movie={movie} />

        <div className="flex flex-col gap-2 mt-2">
          <UserProfileLink className="group" username={user.username}>
            <ReviewHeader user={user} post={post} />
          </UserProfileLink>

          <TextShorter className="my-2" maxCharacters={400} text={post.body} />
        </div>

        <PostCommentaries postId={post.id} />
      </PageContent>
    </BackdropImage>
  );
};

export default MovieReviewView;
