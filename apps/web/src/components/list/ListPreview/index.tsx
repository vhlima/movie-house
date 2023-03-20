import clsx from 'clsx';

import { FindListsQuery, LikeType } from '@/graphql';

import {
  Link,
  Typography,
  SvgIcon,
  TextShorter,
  ListItem,
  LikeButton,
  ProfilePicture,
} from '@/components';

import { MovieCoverAccordion } from '@/components/movie';

import UserProfileLink from '@/components/user/UserProfileLink';

interface Props {
  list: FindListsQuery['lists']['edges'][number]['node'];
  showUser?: boolean;
}

const ListPreview: React.FC<Props> = ({ list, showUser = true }) => {
  const { id, name, user, post, movies, movieCount } = list;

  return (
    <ListItem className="md:flex md:gap-4">
      <Link
        className="block md:flex-shrink-0"
        href={{
          pathname: '/lists/[id]',
          query: { id },
        }}
      >
        <MovieCoverAccordion
          className="w-full"
          size="sm"
          movies={movies}
          maxAmount={5}
        />
      </Link>

      <div className="w-full">
        <Typography
          className="font-bold"
          component="h2"
          color="primary"
          size="lg"
          hover
        >
          <Link
            className="block"
            href={{
              pathname: '/lists/[id]',
              query: { id },
            }}
          >
            {name}
          </Link>
        </Typography>

        <Typography component="span" color="tertiary" size="sm">
          {movieCount} {movieCount === 1 ? 'movie' : 'movies'}
        </Typography>

        {showUser && (
          <UserProfileLink
            className="flex items-center gap-2 group mt-2"
            username={user.username}
          >
            <ProfilePicture src={user.profilePictureUrl} imageSize="sm" />

            <Typography className="font-bold" component="span" groupHover>
              {user.username}
            </Typography>
          </UserProfileLink>
        )}

        {post.content && (
          <TextShorter
            className="mt-2"
            text={post.content}
            maxCharacters={120}
          />
        )}

        <div
          className={clsx('flex gap-2 items-center ml-auto mt-2', {
            'mt-4': !post.content && showUser,
          })}
        >
          <LikeButton
            className="w-16"
            contentId={post.id}
            likeType={LikeType.Post}
          />

          <button className="flex items-center gap-1 w-fit" type="button">
            <SvgIcon iconType="HiChatBubbleBottomCenter" size={22} />
            <Typography className="font-medium" component="span" size="sm">
              3.6k
            </Typography>
          </button>
        </div>
      </div>
    </ListItem>
  );
};

export default ListPreview;
