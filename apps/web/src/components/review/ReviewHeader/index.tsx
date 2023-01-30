import { formatDate } from '../../../utils';

import Typography from '../../Typography';
import ProfilePicture from '../../ProfilePicture';

interface ReviewHeaderProps {
  user: {
    username: string;
    profilePictureUrl?: string;
  };

  post: {
    createdAt: string;
  };
}

const ReviewHeader: React.FC<ReviewHeaderProps> = ({ user, post }) => (
  <div className="flex gap-1 align-top sm:items-center relative">
    <ProfilePicture imageSize="sm" src={user.profilePictureUrl} />

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
  </div>
);

export default ReviewHeader;