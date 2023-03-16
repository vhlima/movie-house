import type { FindReviewQuery } from '@/graphql';

import { PostCommentaries, ProfilePicture, Typography } from '@/components';

import Review from '@/components/review/Review';

import UserProfileLink from '@/components/user/UserProfileLink';
import BackdropImage from '../../../components/BackdropImage';

export interface MovieReviewViewProps {
  review: FindReviewQuery['review'];
}

const MovieReviewView: React.FC<MovieReviewViewProps> = ({ review }) => {
  const { user, movie, post } = review;

  return (
    <BackdropImage src={movie.backdropUrl} alt="Movie review backdrop">
      <div className="flex flex-col gap-2 mb-4">
        <div className="flex gap-2 align-top sm:items-center relative border-b border-b-grey-700 mb-2 pb-2">
          <ProfilePicture imageSize="sm" src={user.profilePictureUrl} />

          <Typography
            className="group-hover:text-grey-300"
            component="span"
            color="primary"
          >
            Review by&nbsp;
            <UserProfileLink className="group" username={user.username}>
              <Typography
                className="font-semibold group-hover:text-grey-300"
                component="strong"
              >
                {user.username}
              </Typography>
            </UserProfileLink>
          </Typography>
        </div>

        <Review review={review} preview />
      </div>

      <PostCommentaries postId={post.id} />
    </BackdropImage>
  );
};

export default MovieReviewView;
