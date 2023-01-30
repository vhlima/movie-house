import { useState } from 'react';

import TextInput from '../TextInput';
import TextInputModal from '../TextInputModal';
import { useLogic } from './logic';

interface CommentaryTextInputProps {
  postId: number;
}

const CommentaryTextInput: React.FC<CommentaryTextInputProps> = ({
  postId,
}) => {
  const [isCommenting, setCommenting] = useState<boolean>(false);

  const { loading, error, handleSubmit } = useLogic(postId);

  return (
    <>
      {isCommenting && (
        <TextInputModal
          rootId={postId}
          loading={loading}
          error={error}
          handleSubmit={handleSubmit}
          onClose={() => setCommenting(false)}
        />
      )}

      <TextInput formik={false} onFocus={() => setCommenting(true)} />
    </>
  );
};

export default CommentaryTextInput;
