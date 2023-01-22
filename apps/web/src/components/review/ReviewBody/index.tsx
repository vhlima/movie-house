import type { Review } from '../../../graphql';

import { formatDate } from '../../../utils';

import Link from '../../Link';

import Typography from '../../Typography';

import TextShorter from '../../TextShorter';

import ProfilePicture from '../../ProfilePicture';

interface ReviewBodyProps {
  review: {
    user: Pick<Review['user'], 'username' | 'profilePictureUrl'>;
    post: Pick<Review['post'], 'id' | 'body' | 'createdAt'>;
  };
}

// TODO there is a visual bug when you are larger than XS size but not enough to reach SM

const ReviewBody: React.FC<ReviewBodyProps> = ({ review: { post, user } }) => (
  <>
    <div className="flex gap-1 align-top sm:items-center relative">
      <ProfilePicture imageSize="sm" src={user.profilePictureUrl} />

      <Link
        className="group"
        href={
          {
            pathname: '/reviews/[id]',
            query: { id: post.id },
          }
          // !id
          //   ? {
          //       pathname: '/users/[username]',
          //       query: { username: user.username },
          //     }
          //   : {
          //       pathname: '/reviews/[id]',
          //       query: { id },
          //     }
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
            {user.username}
          </Typography>
          &nbsp;in {formatDate(post.createdAt)}
        </Typography>
      </Link>
    </div>

    <TextShorter
      className="text-grey-200 my-2"
      maxCharacters={200}
      text={post.body}
    />
  </>
);

export default ReviewBody;
