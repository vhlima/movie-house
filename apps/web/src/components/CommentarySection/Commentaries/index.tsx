import { NetworkStatus } from '@apollo/client';

import type { CommentariesLogicProps } from './logic';

import type { CommentaryHandles } from './components/Commentary';

import { useLogic } from './logic';

import Commentary from './components/Commentary';

import SvgIcon from '../../SvgIcon';

import Observer from '../../Observer';

import ErrorText from '../../ErrorText';

type CommentariesProps = CommentariesLogicProps &
  Omit<CommentaryHandles, 'onClickDelete'>;

const Commentaries: React.FC<CommentariesProps> = ({
  postId,
  onClickReply,
}) => {
  const {
    // loadingRef,
    commentaries,
    networkStatus,

    handleScroll,
    handleDelete,
  } = useLogic({
    postId,
  });

  if (networkStatus === NetworkStatus.loading) {
    return <h1>Loading commentaries...</h1>;
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
        {commentaries.commentaries.edges.map(commentary => (
          <Commentary
            key={commentary.node.id}
            commentary={commentary.node}
            onClickReply={onClickReply}
            onClickDelete={handleDelete}
          />
        ))}
      </div>

      {commentaries.commentaries.pageInfo.hasNextPage && (
        <Observer
          className="flex justify-center mt-2"
          onIntersect={handleScroll}
        >
          <SvgIcon
            className="text-grey-300 animate-spin"
            iconType="CgSpinner"
            size={36}
          />
        </Observer>
      )}
    </>
  );
};

export default Commentaries;
