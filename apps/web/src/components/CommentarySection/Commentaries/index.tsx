import { NetworkStatus } from '@apollo/client';

import type { CommentariesLogicProps } from './logic';

import type { CommentaryHandles } from './components/Commentary';

import { useLogic } from './logic';

import Commentary from './components/Commentary';

import Observer from '../../Observer';

import ErrorText from '../../ErrorText';

import LoadingSpinner from '../../LoadingSpinner';

import ReplySection from '../ReplySection';
import Comment from '../components/Comment';

type CommentariesProps = CommentariesLogicProps &
  Omit<CommentaryHandles, 'onClickDelete'>;

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

  if (!commentaries || commentaries.commentaries.edges.length <= 0) {
    return null;
  }

  return (
    <>
      <div>
        {commentaries.commentaries.edges.map(({ node: commentary }) => (
          <Comment
            key={commentary.id}
            comment={commentary}
            onClickReport={() => ({})}
            onClickReply={onClickReply}
            onClickDelete={handleDelete}
          >
            {commentary.replyCount > 0 && (
              <ReplySection commentary={commentary} />
            )}
          </Comment>
        ))}
      </div>

      {commentaries.commentaries.pageInfo.hasNextPage && (
        <Observer className={spinnerContainerStyle} onIntersect={handleScroll}>
          <LoadingSpinner />
        </Observer>
      )}
    </>
  );
};

export default Commentaries;
