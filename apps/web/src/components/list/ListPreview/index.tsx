import { FindListsQuery } from '@/gql';

import { ListItem, PostMeta } from '@/components';

import { MovieCoverAccordion } from '@/components/movie';

import { ListDetails } from './components';

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
        <PostMeta
          id={post.id}
          user={showUser ? user : undefined}
          content={post.content}
          commentaryCount={0}
        />
      </ListDetails>
    </ListItem>
  );
};

export default ListPreview;
