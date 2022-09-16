import { NetworkStatus } from '@apollo/client';

import type { CommentariesLogicProps } from './logic';

import type { Commentary } from '../../../graphql';

import { useLogic } from './logic';

import Observer from '../../Observer';

import ErrorText from '../../ErrorText';

import LoadingSpinner from '../../LoadingSpinner';

import ReplySection from '../ReplySection';

import Comment from '../components/Comment';

type CommentariesProps = CommentariesLogicProps & {
  onClickReply: (commentId: string) => void;
};

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
      <section className="mb-8">
        {commentaries &&
          commentaries.commentaries.edges.map(({ node: commentary }) => (
            <Comment
              key={commentary.id}
              comment={commentary as Commentary}
              onClickReport={() => ({})}
              onClickReply={onClickReply}
              onClickDelete={handleDelete}
            >
              <ReplySection commentary={commentary as Commentary} />
            </Comment>
          ))}
      </section>

      {commentaries && commentaries.commentaries.pageInfo.hasNextPage && (
        <Observer className={spinnerContainerStyle} onIntersect={handleScroll}>
          <LoadingSpinner />
        </Observer>
      )}
    </>
  );
};

export default Commentaries;
