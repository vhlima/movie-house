import { useState } from 'react';

import type { CommentaryData } from '../../../graphql/Commentary/types';

import { useLogic } from './logic';

import Button from '../../Button';

import SvgIcon from '../../SvgIcon';

import Replies from './components/Replies';

interface RepliesProps {
  commentary: CommentaryData;
}

const ReplySection: React.FC<RepliesProps> = ({
  commentary: { id: commentaryId, replyCount },
}) => {
  const {
    networkStatus,
    repliesResponse,
    isViewingReplies,
    setViewingReplies,
    fetchReplies,
  } = useLogic({
    commentaryId,
  });

  return (
    <>
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
            ? `View ${replyCount} more ${replyCount > 0 ? 'replies' : 'reply'}`
            : `Hide ${replyCount} ${replyCount > 0 ? 'replies' : 'reply'}`}
        </span>
      </Button>

      {isViewingReplies && (
        <Replies
          commentaryId={commentaryId}
          repliesResponse={repliesResponse}
          networkStatus={networkStatus}
        />
      )}
    </>
  );
};

export default ReplySection;
