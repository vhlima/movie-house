import { formatDateFromMillis } from '../../../utils/date-utils';

import Typography from '../../Typography';
import ProfilePicture from '../../ProfilePicture';

interface ReviewHeaderProps {
  user: {
    username: string;
    profilePictureUrl?: string;
  };

  post: {
    createdAt: number;
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
      &nbsp;in {formatDateFromMillis(post.createdAt)}
    </Typography>
  </div>
);

export default ReviewHeader;
