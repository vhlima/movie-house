import Skeleton from '../../../../../Skeleton';

import CommentaryBodySkeleton from '../../Body/Skeleton';

const CommentarySkeleton: React.FC = () => (
  <CommentaryBodySkeleton>
    <div className="flex gap-2">
      <Skeleton className="w-10 h-6" />

      <Skeleton className="w-10 h-6" />
    </div>
  </CommentaryBodySkeleton>
);

export default CommentarySkeleton;
