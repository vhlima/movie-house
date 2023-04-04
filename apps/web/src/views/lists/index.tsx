import type { FindListQuery, FindListMoviesQuery } from '@/graphql';

import { PageContent, PostCommentaries, PostMeta } from '@/components';

import BackdropImage from '../../components/BackdropImage';

import { ListHeading, ListMovies, ListInfo } from './components';

type Props = FindListQuery & FindListMoviesQuery;

const UserListView: React.FC<Props> = props => {
  const { list, listMovies } = props;

  const { user, post } = list;

  const bgUrl =
    'https://a.ltrbxd.com/resized/sm/upload/0y/9x/ts/cw/speed-racer-1200-1200-675-675-crop-000000.jpg';

  return (
    <BackdropImage src={bgUrl} alt="Backdrop image for user list">
      <PageContent className="flex flex-col relative">
        <ListHeading listId={list.id} user={user} />

        <section className="mt-2">
          <ListInfo name={list.name} createdAt={post.createdAt} />

          <PostMeta id={post.id} content={post.content} commentaryCount={0} />

          <ListMovies
            currentPage={listMovies.pageInfo.currentPage}
            totalPages={listMovies.totalPages}
            movies={listMovies.edges.map(edge => edge.node)}
          />
        </section>

        <PostCommentaries postId={post.id} />
      </PageContent>
    </BackdropImage>
  );
};

export default UserListView;
