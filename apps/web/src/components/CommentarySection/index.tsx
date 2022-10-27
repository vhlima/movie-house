import { useState } from 'react';

import { useSession } from 'next-auth/react';

import Commentaries from './Commentaries';

import TextInput from './components/TextInput';

import CommentModal from './components/CommentModal';

export interface CommentaryInteraction {
  type: 'commentary' | 'reply';
  referenceId: string;
}

interface CommentarySectionProps {
  postId: string;
}

const CommentarySection: React.FC<CommentarySectionProps> = ({ postId }) => {
  const {
    data: { user },
  } = useSession();

  const [interaction, setInteraction] = useState<CommentaryInteraction>();

  return (
    <>
      {interaction && (
        <CommentModal
          referenceId={interaction.referenceId}
          isReply={interaction.type === 'reply'}
          onClose={() => setInteraction(undefined)}
        />
      )}

      <div>
        {user && (
          <TextInput
            onFocus={() =>
              setInteraction({ type: 'commentary', referenceId: postId })
            }
          />
        )}

        <Commentaries
          postId={postId}
          onClickReply={commentaryId =>
            setInteraction({ type: 'reply', referenceId: commentaryId })
          }
        />
      </div>
    </>
  );
};

export default CommentarySection;
