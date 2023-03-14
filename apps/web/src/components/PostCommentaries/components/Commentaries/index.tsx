import { NetworkStatus } from '@apollo/client';

import Observer from '../../../Observer';
import ErrorText from '../../../ErrorText';
import LoadingSpinner from '../../../LoadingSpinner';

import Commentary from '../Commentary';

import { useLogic } from './logic';

interface CommentariesProps {
  postId: string;
}

const Commentaries: React.FC<CommentariesProps> = ({ postId }) => {
  const { commentaries, networkStatus, handleScroll } = useLogic({ postId });

  if (networkStatus === NetworkStatus.loading) {
    return <LoadingSpinner className="mt-4" center />;
  }

  if (networkStatus === NetworkStatus.error) {
    return <ErrorText text="Error loading commentaries" />;
  }

  return (
    <>
      <ul>
        {commentaries.commentaries.edges.map(({ node: commentary }) => (
          <Commentary
            key={`post-commentary-${commentary.id}`}
            commentary={commentary}
          />
        ))}
      </ul>

      {commentaries && commentaries.commentaries.pageInfo.hasNextPage && (
        <Observer onIntersect={handleScroll}>
          <LoadingSpinner className="mt-4" center />;
        </Observer>
      )}
    </>
  );
};

export default Commentaries;
