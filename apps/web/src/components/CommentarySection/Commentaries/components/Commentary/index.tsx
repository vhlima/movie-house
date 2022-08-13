import { useState } from 'react';

import type { CommentaryData } from '../../../../../graphql/Commentary/types';

import { useAuth } from '../../../../../hooks/useAuth';

import Button from '../../../../Button';

import SvgIcon from '../../../../SvgIcon';

import LikeButton from '../../../../LikeButton';

import CommentaryBody from '../Body';

import Replies from '../../Replies';

export interface CommentaryHandles {
  onClickDelete: (commentaryId: string) => void;
  onClickReply: (commentaryId: string) => void;
}

interface CommentaryProps extends CommentaryHandles {
  commentary: CommentaryData;
}

const Commentary: React.FC<CommentaryProps> = ({
  commentary: {
    id: commentaryId,
    user: author,
    postId,
    body,
    replyCount,
    likeCount,
    createdAt,
  },
  onClickDelete,
  onClickReply,
}) => {
  const { user } = useAuth();

  const [liked, setLiked] = useState<boolean>(false);

  const [isViewingReplies, setViewingReplies] = useState<boolean>(false);

  return (
    <CommentaryBody user={author} body={body} createdAt={createdAt}>
      <div className="flex gap-2">
        <LikeButton
          rootId={postId}
          referenceId={commentaryId}
          likes={likeCount + (liked ? 1 : 0)}
          liked={liked}
          onLike={() => setLiked(prev => !prev)}
        />

        <Button
          className="uppercase"
          buttonStyle="tertiary"
          buttonSize="xs"
          full={false}
          onClick={() => onClickReply(commentaryId)}
        >
          Reply
        </Button>

        {user &&
          (user.id !== author.id ? (
            <Button
              className="ml-auto"
              buttonStyle="secondary"
              buttonSize="xs"
              full={false}
            >
              <SvgIcon className="text-grey-300" iconType="BsFlagFill" />
            </Button>
          ) : (
            <Button
              className="ml-auto"
              buttonStyle="danger"
              buttonSize="xs"
              full={false}
              onClick={() => onClickDelete(commentaryId)}
            >
              <SvgIcon iconType="FiX" />
            </Button>
          ))}
      </div>

      {replyCount > 0 && (
        <Button
          buttonStyle="tertiary"
          buttonSize="none"
          full={false}
          onClick={() => setViewingReplies(prev => !prev)}
        >
          <SvgIcon
            className="mr-2"
            size={18}
            iconType={!isViewingReplies ? 'FaChevronDown' : 'FaChevronUp'}
          />

          <span className="text-grey-200">
            {!isViewingReplies
              ? `View ${replyCount} more ${
                  replyCount > 0 ? 'replies' : 'reply'
                }`
              : `Hide ${replyCount} ${replyCount > 0 ? 'replies' : 'reply'}`}
          </span>
        </Button>
      )}

      <Replies commentaryId={commentaryId} load={isViewingReplies} />
    </CommentaryBody>
  );
};

export default Commentary;
