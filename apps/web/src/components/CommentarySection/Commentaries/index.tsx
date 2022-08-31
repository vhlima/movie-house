import { NetworkStatus } from '@apollo/client';

import type { CommentariesLogicProps } from './logic';

import type { CommentHandles } from '../components/Comment';

import { useLogic } from './logic';

import Observer from '../../Observer';

import ErrorText from '../../ErrorText';

import LoadingSpinner from '../../LoadingSpinner';

import ReplySection from '../ReplySection';

import Comment from '../components/Comment';

type CommentariesProps = CommentariesLogicProps &
  Pick<CommentHandles, 'onClickReply'>;

const Commentaries: React.FC<CommentariesProps> = ({
  postId,
  onClickReply,
}) => {
  const {
    commentaries,
    networkStatus,

    handleScroll,
    handleDelete,
  } = useLogic({
    postId,
  });

  const spinnerContainerStyle = 'flex justify-center mt-4';

  if (networkStatus === NetworkStatus.loading) {
    return <LoadingSpinner className={spinnerContainerStyle} />;
  }

  if (networkStatus === NetworkStatus.error) {
    return <ErrorText text="Error loading commentaries" />;
  }

  return (
    <>
      <div className="mt-2 mb-8">
        {commentaries &&
          commentaries.commentaries.edges.map(({ node: commentary }) => (
            <Comment
              key={commentary.id}
              comment={commentary}
              onClickReport={() => ({})}
              onClickReply={onClickReply}
              onClickDelete={handleDelete}
            >
              <ReplySection commentary={commentary} />
            </Comment>
          ))}
      </div>

      {commentaries && commentaries.commentaries.pageInfo.hasNextPage && (
        <Observer className={spinnerContainerStyle} onIntersect={handleScroll}>
          <LoadingSpinner />
        </Observer>
      )}
    </>
  );
};

export default Commentaries;
