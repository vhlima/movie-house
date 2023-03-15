import type { FindReviewQuery } from '@/graphql';

import { PageContent, PostCommentaries, TextShorter } from '@/components';
import { MovieInfos } from '@/components/movie';
import BackdropImage from '../../../components/BackdropImage';
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
        {/* <MovieInfos movie={movie} /> */}

        <div className="flex flex-col gap-2 mt-2 z-50">
          <UserProfileLink className="group" username={user.username}>
            <ReviewHeader user={user} post={post} />
          </UserProfileLink>

          <TextShorter
            className="my-2"
            maxCharacters={400}
            text={post.content}
          />
        </div>

        <PostCommentaries postId={post.id} />
      </PageContent>
    </BackdropImage>
  );
};

export default MovieReviewView;
