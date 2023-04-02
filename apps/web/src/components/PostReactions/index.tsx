import { LikeButton, SvgIcon, Typography } from '@/components';

import { LikeType } from '@/graphql';

interface Props {
  postId: string;
}

export const PostReactions: React.FC<Props> = ({ postId }) => (
  <div className="flex gap-2 my-4" data-testid="post-reactions">
    <LikeButton contentId={postId} likeType={LikeType.Post} />

    <div className="flex items-center gap-1 w-fit">
      <SvgIcon iconType="HiChatBubbleBottomCenter" size={22} />

      <Typography className="font-medium" component="span" size="sm">
        3.6k
      </Typography>
    </div>
  </div>
);
