import { format } from 'date-fns';

import type { ReviewData } from '../../../../graphql/Review/types';

import ProfilePicture from '../../../ProfilePicture';

import TextShorter from '../../../TextShorter';

import LikeButton from '../../../LikeButton';

import Link from '../../../Link';

interface ReviewTextProps {
  review: ReviewData;
  preview?: boolean;
}

const ReviewText: React.FC<ReviewTextProps> = ({
  review: { id: reviewId, author, body, createdAt },
  preview,
}) => (
  <div className="flex flex-col gap-2 mb-2">
    <div className="flex items-center gap-1">
      <ProfilePicture imageSize="sm" src={author.profilePictureUrl} />

      <Link
        className="group"
        href={
          !preview
            ? {
                pathname: '/users/[id]',
                query: { id: author.id },
              }
            : {
                pathname: '/reviews/[id]',
                query: { id: reviewId },
              }
        }
      >
        <span className="text-gray-200 group-hover:text-grey-300 mr-1">
          Reviewed by
        </span>

        <span className="text-gray-100 font-semibold group-hover:text-grey-200">
          {author.username}
        </span>
      </Link>

      <span className="text-grey-200">
        in {format(new Date(createdAt), 'MMM dd, yyyy')}
      </span>
    </div>

    <TextShorter
      className="text-grey-200"
      maxCharacters={preview ? 100 : 200}
      text={body}
    />

    <LikeButton rootId={reviewId} likes={0} onLike={() => ({})} />
  </div>
);

export default ReviewText;
