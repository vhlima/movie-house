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
      <div className="md:flex-shrink-0">
        <MovieCoverAccordion
          className="w-full"
          size="sm"
          movies={movies}
          maxAmount={5}
        />
      </div>

      <div className="w-full">
        <Link
          className="block"
          href={{
            pathname: '/lists/[id]',
            query: { id },
          }}
          data-testid="list-link"
        >
          <Typography
            className="font-bold"
            component="h2"
            color="primary"
            size="lg"
            hover
            data-testid="list-name"
          >
            {name}
          </Typography>
        </Link>

        <Typography component="span" color="tertiary" size="sm">
          <span data-testid="movie-count">{movieCount}</span>
          <span>&nbsp;{movieCount === 1 ? 'movie' : 'movies'}</span>
        </Typography>

        {showUser && (
          <UserProfileLink
            className="flex items-center gap-2 group mt-2"
            username={user.username}
            data-testid="list-user-info"
          >
            <ProfilePicture
              src={user.profilePictureUrl}
              imageSize="sm"
              data-testid="list-user-profile-picture"
            />

            <Typography
              className="font-bold"
              component="span"
              groupHover
              data-testid="list-user-username"
            >
              {user.username}
            </Typography>
          </UserProfileLink>
        )}

        {post.content && (
          <TextShorter
            className="my-4"
            text={post.content}
            maxCharacters={120}
            data-testid="post-content"
          />
        )}

        <PostReactions postId={post.id} />
      </div>
    </ListItem>
  );
};

export default ListPreview;
