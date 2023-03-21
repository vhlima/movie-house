import { FindListsQuery } from '@/graphql';

import {
  Link,
  Typography,
  TextShorter,
  ListItem,
  ProfilePicture,
  PostReactions,
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
            className="my-4"
            text={post.content}
            maxCharacters={120}
          />
        )}

        <PostReactions postId={post.id} />
      </div>
    </ListItem>
  );
};

export default ListPreview;
