import { useState } from 'react';

import TextInput from './components/TextInput';
import Commentaries from './components/Commentaries';
import TextInputModal from './components/TextInputModal';

interface PostCommentariesProps {
  postId: number;
}

const PostCommentaries: React.FC<PostCommentariesProps> = ({ postId }) => {
  const [isCommenting, setCommenting] = useState<boolean>(false);

  return (
    <>
      {isCommenting && (
        <TextInputModal rootId={postId} onClose={() => setCommenting(false)} />
      )}

      <TextInput formik={false} onFocus={() => setCommenting(true)} />

      <Commentaries postId={postId} />
    </>
  );
};

export default PostCommentaries;
