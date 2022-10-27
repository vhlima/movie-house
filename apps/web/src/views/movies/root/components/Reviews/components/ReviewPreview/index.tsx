import type { Review } from '../../../../../../../graphql';

import Link from '../../../../../../../components/Link';

import ListItem from '../../../../../../../components/ListItem';

import MovieRatingStar from '../../../../../components/RatingStar';

import LikeButton from '../../../../../../../components/LikeButton';

import Typography from '../../../../../../../components/Typography';

import ProfilePicture from '../../../../../../../components/ProfilePicture';

import CommentaryCount from '../../../../../../../components/CommentaryCount';

interface ReviewPreviewProps {
  review: Review;
}

const ReviewPreview: React.FC<ReviewPreviewProps> = ({ review }) => (
  <ListItem key={`popular-reviews-${review}`}>
    <div className="flex items-center gap-1">
      <ProfilePicture src={review.author.profilePictureUrl} imageSize="sm" />

      <Link
        className="group"
        href={{
          pathname: '/reviews/[id]',
          query: { id: review.id },
        }}
      >
        <Typography className="group-hover:text-grey-300" component="span">
          Reviewed by
          <Typography className="ml-1" component="span" color="primary">
            {review.author.username}
          </Typography>
        </Typography>
      </Link>

      <div className="ml-auto">
        <MovieRatingStar color="blue" size={22} rating={2.5} reverse checked />
      </div>
    </div>

    <Typography className="my-1" component="p">
      {review.body}
    </Typography>

    <div className="flex items-center gap-2">
      <LikeButton rootId={review.id} likeCount={0} />
      <CommentaryCount count={2} />
    </div>
  </ListItem>
);

export default ReviewPreview;
