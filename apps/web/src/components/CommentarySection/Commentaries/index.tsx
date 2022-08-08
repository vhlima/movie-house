import { NetworkStatus } from '@apollo/client';
import type { CommentariesLogicProps } from './logic';

import type { CommentaryHandles } from './components/Commentary';

import { useLogic } from './logic';

import Commentary from './components/Commentary';

import SvgIcon from '../../SvgIcon';
import Observer from '../../Observer';

type CommentariesProps = CommentariesLogicProps &
  Omit<CommentaryHandles, 'onClickDelete'>;

const Commentaries: React.FC<CommentariesProps> = ({
  postId,
  onClickReply,
}) => {
  const {
    // loadingRef,
    commentariesResponse,
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
    return <h1>error loading commentaries</h1>;
  }

  if (
    !commentariesResponse ||
    commentariesResponse.commentaries.commentaries.length <= 0
  ) {
    return null;
  }

  return (
    <>
      <div>
        {commentariesResponse.commentaries.commentaries.map(commentary => (
          <Commentary
            key={commentary._id}
            commentary={commentary}
            onClickReply={onClickReply}
            onClickDelete={handleDelete}
          />
        ))}
      </div>

      {commentariesResponse.commentaries.hasNextPage && (
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
