import { useRouter } from 'next/router';

import { FindListQuery, LikeType } from '@/graphql';

import {
  Typography,
  PageContent,
  PostCommentaries,
  ProfilePicture,
  SubHeading,
  TextShorter,
  LikeButton,
  SvgIcon,
} from '@/components';

import { DecadeDropdown, GenreDropdown, SortButton } from '@/components/Sort';

import { SingleDropdown } from '@/hooks/useSingleDropdown';

import { formatDateDistanceFromMillis } from '@/utils/date-utils';

import BackdropImage from '../../components/BackdropImage';

import UserProfileLink from '../../components/user/UserProfileLink';

import ListMovies from './components/ListMovies';

type UserListViewProps = FindListQuery;

const UserListView: React.FC<UserListViewProps> = ({ list }) => {
  const { asPath } = useRouter();

  const rootPath = asPath.split('/').slice(0, 4).join('/');

  const bgUrl =
    'https://a.ltrbxd.com/resized/sm/upload/0y/9x/ts/cw/speed-racer-1200-1200-675-675-crop-000000.jpg';

  const { id: listId, user, name, post } = list;

  const postCreationDateFormatted = formatDateDistanceFromMillis(
    post.createdAt,
  );

  return (
    <BackdropImage src={bgUrl} alt="Backdrop image for user list">
      <PageContent className="flex flex-col relative">
        <SubHeading className="flex-col sm:flex-row">
          <UserProfileLink
            className="flex items-center group"
            username={user.username}
          >
            <ProfilePicture src={user.profilePictureUrl} imageSize="sm" />

            <Typography className="ml-2" component="span" groupHover>
              List by&nbsp;
              <Typography component="strong" color="primary" groupHover>
                {user.username}
              </Typography>
            </Typography>
          </UserProfileLink>

          <div className="flex flex-col items-center gap-2 flex-wrap sm:gap-0 sm:flex-nowrap sm:flex-row sm:w-fit sm:ml-auto">
            <SingleDropdown>
              <SortButton type="decade" intent="secondary">
                <DecadeDropdown pathname={rootPath} />
              </SortButton>

              <SortButton type="genre" intent="secondary">
                <GenreDropdown pathname={rootPath} />
              </SortButton>
            </SingleDropdown>
          </div>
        </SubHeading>

        <section className="mt-2">
          <Typography
            className="font-semibold"
            component="h1"
            color="primary"
            size="xl"
          >
            {name}
          </Typography>

          <Typography component="span" size="sm" color="tertiary">
            Published&nbsp;{postCreationDateFormatted}
          </Typography>

          {post.content && (
            <TextShorter
              className="my-2"
              text={post.content}
              maxCharacters={300}
            />
          )}

          <ListMovies listId={listId} />

          <div className="flex gap-2 my-4">
            <LikeButton contentId={list.post.id} likeType={LikeType.Post} />

            <div className="flex items-center gap-1 w-fit">
              <SvgIcon iconType="HiChatBubbleBottomCenter" size={22} />
              <Typography className="font-medium" component="span" size="sm">
                3.6k
              </Typography>
            </div>
          </div>
        </section>

        <PostCommentaries postId={post.id} />
      </PageContent>
    </BackdropImage>
  );
};

export default UserListView;
