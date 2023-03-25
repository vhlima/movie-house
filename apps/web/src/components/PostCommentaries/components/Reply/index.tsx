import type { FindRepliesQuery } from '@/graphql';

import CommentaryBase from '../CommentaryBase';

import { useLogic } from './logic';

interface ReplyProps {
  reply: FindRepliesQuery['replies']['edges'][number]['node'];
}

const Reply: React.FC<ReplyProps> = ({ reply }) => {
  const { handleDelete } = useLogic(reply.commentaryId);

  return (
    <CommentaryBase
      base={reply}
      onClickDelete={() => handleDelete(reply.id)}
      isReply
    />
  );
};

export default Reply;
