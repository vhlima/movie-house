import { FindListsQuery } from '@/graphql';

import { TextShorter, ListItem, PostReactions } from '@/components';

import { MovieCoverAccordion } from '@/components/movie';

import { ListDetails, ListUserDetails } from './components';

interface Props {
  list: FindListsQuery['lists']['edges'][number]['node'];
  showUser?: boolean;
}

const ListPreview: React.FC<Props> = ({ list, showUser = true }) => {
  const { id, name, movieCount, user, post, movies } = list;

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

      <ListDetails id={id} name={name} movieCount={movieCount}>
        {showUser && (
          <ListUserDetails
            username={user.username}
            profilePictureUrl={user.profilePictureUrl}
          />
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
      </ListDetails>
    </ListItem>
  );
};

export default ListPreview;
