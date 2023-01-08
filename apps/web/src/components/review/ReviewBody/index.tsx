import type { Review } from '../../../graphql';

import { formatDate } from '../../../utils';

import Link from '../../Link';

import Typography from '../../Typography';

import TextShorter from '../../TextShorter';

import ProfilePicture from '../../ProfilePicture';

interface ReviewBodyProps
  extends Pick<Review, 'author' | 'body' | 'createdAt'> {
  id?: string;
}

const ReviewBody: React.FC<ReviewBodyProps> = ({
  id,
  author,
  body,
  createdAt,
}) => (
  <>
    <div className="flex align-top gap-1">
      <ProfilePicture imageSize="sm" src={author.profilePictureUrl} />

      <Link
        className="group"
        href={
          !id
            ? {
                pathname: '/users/[username]',
                query: { username: author.username },
              }
            : {
                pathname: '/reviews/[id]',
                query: { id },
              }
        }
      >
        <Typography
          className="group-hover:text-grey-300"
          component="span"
          color="primary"
        >
          Reviewed by&nbsp;
          <Typography
            className="font-semibold group-hover:text-grey-300"
            component="strong"
          >
            {author.username}
          </Typography>
          &nbsp;in {formatDate(createdAt)}
        </Typography>
      </Link>
    </div>

    <TextShorter
      className="text-grey-200 my-2"
      maxCharacters={200}
      text={body}
    />
  </>
);

export default ReviewBody;
