import { useState } from 'react';

import type { CommentaryData } from '../../../../../../graphql/Commentary/types';

import type { ReplyData } from '../../../../../../graphql/Reply/types';

import type { CommentHandles } from '../..';

import { useAuth } from '../../../../../../hooks/useAuth';

import Button from '../../../../../Button';

import LikeButton from '../../../../../LikeButton';
import SvgIcon from '../../../../../SvgIcon';

interface CommentButtonsProps extends CommentHandles {
  comment: CommentaryData | ReplyData;
}

const CommentButtons: React.FC<CommentButtonsProps> = ({
  comment,
  onClickDelete,
  onClickReport,
  onClickReply,
}) => {
  const { user } = useAuth();

  const [liked, setLiked] = useState<boolean>(false);

  return (
    <div className="flex gap-2">
      <LikeButton
        rootId={comment.postId}
        referenceId={comment.id}
        likes={comment.likeCount + (liked ? 1 : 0)}
        liked={liked}
        onLike={() => setLiked(prev => !prev)}
      />

      {onClickReply && (
        <Button
          className="uppercase"
          buttonStyle="tertiary"
          buttonSize="xs"
          full={false}
          onClick={() => onClickReply(comment.id)}
        >
          Reply
        </Button>
      )}

      {user &&
        (user.id !== comment.user.id ? (
          <Button
            className="ml-auto"
            buttonStyle="secondary"
            buttonSize="xs"
            full={false}
            onClick={() => onClickReport(comment.id)}
          >
            <SvgIcon className="text-grey-300" iconType="BsFlagFill" />
          </Button>
        ) : (
          <Button
            className="ml-auto"
            buttonStyle="danger"
            buttonSize="xs"
            full={false}
            onClick={() => onClickDelete(comment.id)}
          >
            <SvgIcon iconType="FiX" />
          </Button>
        ))}
    </div>
  );
};

export default CommentButtons;
