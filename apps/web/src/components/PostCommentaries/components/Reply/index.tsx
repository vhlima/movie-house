import type { Reply } from '../../../../graphql';

import type { CommentaryBaseProps } from '../CommentaryBase';

import CommentaryBase from '../CommentaryBase';

import { useLogic } from './logic';

interface CommentaryReplyProps {
  reply: {
    id: string;
    commentary: {
      id: Reply['commentary']['id'];
    };
  } & CommentaryBaseProps;
}

const CommentaryReply: React.FC<CommentaryReplyProps> = ({ reply }) => {
  const { handleDelete } = useLogic(reply.commentary.id);

  return (
    <CommentaryBase
      base={reply}
      onClickDelete={() => handleDelete(reply.id)}
      isReply
    />
  );
};

export default CommentaryReply;
