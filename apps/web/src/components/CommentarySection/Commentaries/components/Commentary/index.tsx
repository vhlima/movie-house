import { useState } from 'react';

import type { PropsWithChildren } from 'react';

import type { CommentaryData } from '../../../../../graphql/Commentary/types';

import { useAuth } from '../../../../../hooks/useAuth';

import Button from '../../../../Button';

import SvgIcon from '../../../../SvgIcon';

import LikeButton from '../../../../LikeButton';

import Comment from '../../../components/Comment';

export interface CommentaryHandles {
  onClickDelete: (commentaryId: string) => void;
  onClickReply: (commentaryId: string) => void;
}

interface CommentaryProps extends CommentaryHandles {
  commentary: CommentaryData;
}

const Commentary: React.FC<PropsWithChildren<CommentaryProps>> = ({
  commentary,
  children,
  onClickDelete,
  onClickReply,
}) => {
  const { user } = useAuth();

  const [liked, setLiked] = useState<boolean>(false);

  return (
    <Comment comment={commentary}>
      <div className="flex gap-2">
        <LikeButton
          rootId={commentary.postId}
          referenceId={commentary.id}
          likes={commentary.likeCount + (liked ? 1 : 0)}
          liked={liked}
          onLike={() => setLiked(prev => !prev)}
        />

        <Button
          className="uppercase"
          buttonStyle="tertiary"
          buttonSize="xs"
          full={false}
          onClick={() => onClickReply(commentary.id)}
        >
          Reply
        </Button>

        {user &&
          (user.id !== commentary.user.id ? (
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
              onClick={() => onClickDelete(commentary.id)}
            >
              <SvgIcon iconType="FiX" />
            </Button>
          ))}
      </div>

      {children}
    </Comment>
  );
};

export default Commentary;
