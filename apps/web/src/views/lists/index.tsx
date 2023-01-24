import { useRouter } from 'next/router';

import { useFindUserListQuery } from '../../graphql';

import { formatDateDistance } from '../../utils';

import Typography from '../../components/Typography';
import PageContent from '../../components/PageContent';
import BackdropImage from '../../components/BackdropImage';
import ProfilePicture from '../../components/ProfilePicture';
import PostCommentaries from '../../components/PostCommentaries';

import UserProfileLink from '../../components/user/UserProfileLink';

import ListMovies from './components/ListMovies';

const UserListView: React.FC = () => {
  const { query } = useRouter();

  const { data: userListData } = useFindUserListQuery({
    variables: {
      postId: parseInt(query.id as string, 10),
    },
  });

  if (!userListData) {
    return null;
  }

  const bgUrl =
    'https://a.ltrbxd.com/resized/sm/upload/es/4u/du/em/spooky-1200-1200-675-675-crop-000000.jpg?v=4f77fabd8c';

  const { id: listId, user, name, post } = userListData.userList;

  return (
    <BackdropImage src={bgUrl} alt="Backdrop image for user list">
      <PageContent className="flex flex-col gap-2 relative">
        <div className="flex items-center">
          <ProfilePicture src={user.profilePictureUrl} imageSize="sm" />

          <Typography className="ml-2 mr-1" component="span">
            List by
          </Typography>

          <UserProfileLink username={user.username}>
            <Typography
              className="hover:text-grey-200"
              component="strong"
              color="primary"
            >
              {user.username}
            </Typography>
          </UserProfileLink>
        </div>

        <div className="flex items-center">
          <Typography size="sm" component="span">
            Published
            <Typography className="ml-1" component="time">
              {formatDateDistance(post.createdAt)}
            </Typography>
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

        <section>
          <Typography
            className="font-semibold"
            component="h1"
            color="primary"
            size="xl"
          >
            {name}
          </Typography>

          {post.body && <Typography component="p">{post.body}</Typography>}

          <ListMovies listId={listId} />
        </section>

        {/* <div className="flex gap-2 mb-2">
          <LikeButton rootId={list.post.id} likeCount={0} />

          <CommentaryCount count={0} />
        </div> */}

        <PostCommentaries postId={post.id} />
      </PageContent>
    </BackdropImage>
  );
};

export default UserListView;
