import { useState } from 'react';

import type { FindCommentariesQuery } from '@/graphql';

import { Typography } from '@/components';
import Button from '../../../Button';
import SvgIcon from '../../../SvgIcon';

import Replies from '../Replies';
import CommentaryBase from '../CommentaryBase';

import ReplyButton from './components/ReplyButton';

import { useLogic } from './logic';

interface CommentaryProps {
  commentary: FindCommentariesQuery['commentaries']['edges'][number]['node'];
}

const Commentary: React.FC<CommentaryProps> = ({ commentary }) => {
  const { handleDeleteCommentary } = useLogic(commentary.id);

  const [isViewingReplies, setViewingReplies] = useState<boolean>(false);

  const { id, replyCount } = commentary;

  return (
    <CommentaryBase
      base={commentary}
      buttons={
        <ReplyButton
          commentaryId={commentary.id}
          onClick={() => setViewingReplies(true)}
        />
      }
      onClickDelete={handleDeleteCommentary}
    >
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

          <Typography component="span">
            {!isViewingReplies
              ? `View ${replyCount} more ${
                  replyCount > 0 ? 'replies' : 'reply'
                }`
              : `Hide ${replyCount} ${replyCount > 0 ? 'replies' : 'reply'}`}
          </Typography>
        </Button>
      )}

      {isViewingReplies && <Replies commentaryId={id} />}
    </CommentaryBase>
  );
};

export default Commentary;
