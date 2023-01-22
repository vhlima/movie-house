import { useState } from 'react';

import type { CommentaryBaseProps } from '../CommentaryBase';

import Button from '../../../Button';
import SvgIcon from '../../../SvgIcon';
import Typography from '../../../Typography';

import Replies from '../Replies';
import CommentaryBase from '../CommentaryBase';
import { useLogic } from './logic';

interface CommentaryProps {
  commentary: {
    id: string;
    replyCount: number;
  } & CommentaryBaseProps;
}

const Commentary: React.FC<CommentaryProps> = ({ commentary }) => {
  const { handleDeleteCommentary } = useLogic(commentary.id);

  const [isViewingReplies, setViewingReplies] = useState<boolean>(false);

  const { id, replyCount } = commentary;

  return (
    <CommentaryBase base={commentary} onClickDelete={handleDeleteCommentary}>
      {replyCount > 0 && (
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

            <Typography component="span">
              {!isViewingReplies
                ? `View ${replyCount} more ${
                    replyCount > 0 ? 'replies' : 'reply'
                  }`
                : `Hide ${replyCount} ${replyCount > 0 ? 'replies' : 'reply'}`}
            </Typography>
          </Button>

          {isViewingReplies && <Replies commentaryId={id} />}
        </>
      )}
    </CommentaryBase>
  );
};

export default Commentary;
