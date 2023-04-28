import type { FindListQuery, FindListMoviesQuery } from '@/gql';

import { PageContent, PostCommentaries, PostMeta } from '@/components';

import BackdropImage from '../../components/BackdropImage';

import { ListMovies, ListHeading } from './components';

const bgUrl =
  'https://a.ltrbxd.com/resized/sm/upload/0y/9x/ts/cw/speed-racer-1200-1200-675-675-crop-000000.jpg';

type Props = FindListQuery & FindListMoviesQuery;

const UserListView: React.FC<Props> = props => {
  const { list, listMovies } = props;

  const { user, post } = list;

  return (
    <BackdropImage src={bgUrl} alt="Backdrop image for user list">
      <PageContent className="flex flex-col relative">
        <ListHeading id={list.id} name={list.name} createdAt={post.createdAt} />

        <PostMeta
          id={post.id}
          user={user}
          content={post.content}
          commentaryCount={0}
        />

        <ListMovies
          currentPage={listMovies.pageInfo.currentPage}
          totalPages={listMovies.totalPages}
          movies={listMovies.edges.map(edge => edge.node)}
        />

        <PostCommentaries postId={post.id} />
      </PageContent>
    </BackdropImage>
  );
};

export default UserListView;
