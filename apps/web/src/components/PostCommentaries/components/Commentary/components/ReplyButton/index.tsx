import { useState } from 'react';

import { Button } from '@/components';

import TextInputModal from '../../../TextInputModal';

import { useLogic } from './logic';

interface ReplyButtonProps {
  commentaryId: string;
  onClick: () => void;
}

const ReplyButton: React.FC<ReplyButtonProps> = ({ commentaryId, onClick }) => {
  const [isReplying, setReplying] = useState<boolean>(false);

  const { loading, error, handleSubmit } = useLogic(commentaryId);

  return (
    <>
      {isReplying && (
        <TextInputModal
          rootId={commentaryId}
          loading={loading}
          error={error}
          handleSubmit={handleSubmit}
          onClose={() => setReplying(false)}
        />
      )}

      <Button
        className="uppercase"
        intent="tertiary"
        size="sm"
        full={false}
        onClick={() => {
          onClick();
          setReplying(true);
        }}
      >
        Reply
      </Button>
    </>
  );
};

export default ReplyButton;
