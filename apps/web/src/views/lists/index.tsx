import type { UserListCustom } from '../../graphql';

import Link from '../../components/Link';

import SvgIcon from '../../components/SvgIcon';

import Typography from '../../components/Typography';

import PageContent from '../../components/PageContent';

import MoviesSection from './components/MoviesSection';

import ProfilePicture from '../../components/ProfilePicture';

import BackgroundImage from '../../components/BackgroundImage';
import CommentarySection from '../../components/CommentarySection';
import CommentaryCount from '../../components/CommentaryCount';
import LikeButton from '../../components/LikeButton';

interface UserListViewProps {
  list: UserListCustom;
}

const UserListView: React.FC<UserListViewProps> = ({ list }) => {
  const bgUrl =
    'https://a.ltrbxd.com/resized/sm/upload/es/4u/du/em/spooky-1200-1200-675-675-crop-000000.jpg?v=4f77fabd8c';

  return (
    <>
      {bgUrl && <BackgroundImage src={bgUrl} />}

      <PageContent className="flex flex-col gap-2 relative pb-3 mt-40">
        <div className="flex">
          <ProfilePicture src={list.author.profilePictureUrl} imageSize="sm" />

          <Typography className="ml-2 mr-1" component="span">
            List by
          </Typography>

          <Link
            href={{
              pathname: '/users/[username]',
              query: { username: list.author.username },
            }}
          >
            <Typography
              className="hover:text-grey-200"
              component="strong"
              color="primary"
            >
              {list.author.username}
            </Typography>
          </Link>
        </div>

        <div className="flex items-center py-1 border-y border-y-grey-300">
          <Typography size="sm" component="span">
            Published <Typography component="time">23 minutes ago</Typography>
          </Typography>

          {/* <div className="flex items-center ml-auto">
            <button type="button">
              <SvgIcon
                className="text-grey-300 hover:text-grey-400"
                size={24}
                iconType="MdOutlineSort"
              />
            </button>
          </div> */}
        </div>

        <MoviesSection list={list} />

        <div className="flex gap-2">
          <LikeButton rootId={list.id} likeCount={0} />

          <CommentaryCount count={0} />
        </div>
      </PageContent>

      <CommentarySection postId={list.id} />
    </>
  );
};

export default UserListView;
