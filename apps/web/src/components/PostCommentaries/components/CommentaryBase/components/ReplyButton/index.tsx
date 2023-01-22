import { useState } from 'react';

import Button from '../../../../../Button';

import TextInputModal from '../../../TextInputModal';

interface ReplyButtonProps {
  commentaryId: string;
}

const ReplyButton: React.FC<ReplyButtonProps> = ({ commentaryId }) => {
  const [isReplying, setReplying] = useState<boolean>(false);

  return (
    <>
      {isReplying && (
        <TextInputModal
          rootId={commentaryId}
          onClose={() => setReplying(false)}
        />
      )}

      <Button
        className="uppercase"
        buttonStyle="tertiary"
        buttonSize="xs"
        full={false}
        onClick={() => setReplying(true)}
      >
        Reply
      </Button>
    </>
  );
};

export default ReplyButton;
