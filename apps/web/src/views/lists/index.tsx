import type { FindListQuery, FindListMoviesQuery } from '@/graphql';

import { LikeType } from '@/graphql';

import {
  Typography,
  PageContent,
  PostCommentaries,
  TextShorter,
  LikeButton,
  SvgIcon,
} from '@/components';

import { formatDateDistanceFromMillis } from '@/utils/date-utils';

import BackdropImage from '../../components/BackdropImage';

import ListMovies from './components/ListMovies';
import ListHeading from './components/ListHeading';

type UserListViewProps = FindListQuery & FindListMoviesQuery;

const UserListView: React.FC<UserListViewProps> = ({ list, listMovies }) => {
  const bgUrl =
    'https://a.ltrbxd.com/resized/sm/upload/0y/9x/ts/cw/speed-racer-1200-1200-675-675-crop-000000.jpg';

  const { user, name, post } = list;

  const postCreationDateFormatted = formatDateDistanceFromMillis(
    post.createdAt,
  );

  return (
    <BackdropImage src={bgUrl} alt="Backdrop image for user list">
      <PageContent className="flex flex-col relative">
        <ListHeading listId={list.id} user={user} />

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

          <ListMovies movies={listMovies} />

          <div className="flex gap-2 my-4">
            <LikeButton contentId={post.id} likeType={LikeType.Post} />

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
