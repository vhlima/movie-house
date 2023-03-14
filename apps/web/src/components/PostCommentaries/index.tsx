import Commentaries from './components/Commentaries';

import CommentaryTextInput from './components/CommentaryTextInput';

interface PostCommentariesProps {
  postId: string;
}

const PostCommentaries: React.FC<PostCommentariesProps> = ({ postId }) => (
  <>
    <CommentaryTextInput postId={postId} />

    <Commentaries postId={postId} />
  </>
);

export default PostCommentaries;
