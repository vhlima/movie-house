import { LikeType } from '@/graphql';

import { CommentaryCount } from '../CommentaryCount';

import { LikeButton } from '../LikeButton';

interface Props {
  postId: string;
  commentaryCount: number;
}

export const PostReactions: React.FC<Props> = props => {
  const { postId, commentaryCount } = props;

  return (
    <div className="flex gap-2" data-testid="post-reactions">
      <LikeButton postId={postId} likeType={LikeType.Post} />

      <CommentaryCount commentaryCount={commentaryCount} />
    </div>
  );
};
