import TextInputForm from '../TextInputForm';

import { useLogic } from './logic';

interface CommentaryTextInputProps {
  postId: number;
}

const CommentaryTextInput: React.FC<CommentaryTextInputProps> = ({
  postId,
}) => {
  const { loading, error, handleSubmit } = useLogic(postId);

  return (
    <>
      {/* {isCommenting && (
        <TextInputModal
          rootId={postId}
          loading={loading}
          error={error}
          handleSubmit={handleSubmit}
          onClose={() => setCommenting(false)}
        />
      )}

      <TextInput formik={false} /> */}

      <TextInputForm
        rootId={postId}
        error={error}
        loading={loading}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default CommentaryTextInput;
