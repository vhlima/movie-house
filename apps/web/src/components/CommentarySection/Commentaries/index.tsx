import { useMutation, useQuery } from '@apollo/client';

import type {
  CommentaryCacheData,
  CommentaryResponse,
} from '../../../types/commentary';

import type { CommentaryHandles } from './components/Commentary';

import { COMMENTARIES, DELETE_COMMENTARY } from '../../../graphql/commentary';

import Commentary from './components/Commentary';

interface CommentariesProps extends Omit<CommentaryHandles, 'onClickDelete'> {
  postId: string;
}

const Commentaries: React.FC<CommentariesProps> = ({
  postId,
  onClickReply,
}) => {
  // TODO lazy load comments

  const { loading, error, data } = useQuery<{
    commentaries: CommentaryResponse[];
  }>(COMMENTARIES, {
    variables: { postId },
  });

  const [deleteComment, deleteCommentResponse] = useMutation<
    string,
    { commentaryId: string }
  >(DELETE_COMMENTARY, {
    update: (cache, _, context) => {
      const commentariesData = cache.readQuery<CommentaryCacheData>({
        query: COMMENTARIES,
        variables: { postId },
      });

      cache.writeQuery<CommentaryCacheData>({
        query: COMMENTARIES,
        variables: { postId },
        data: {
          commentaries: (commentariesData.commentaries || []).filter(
            commentary => commentary._id !== context?.variables?.commentaryId,
          ),
        },
      });
    },
  });

  const handleDelete = async (commentaryId: string) => {
    if (deleteCommentResponse.loading) return;

    await deleteComment({ variables: { commentaryId } });

    deleteCommentResponse.reset();
  };

  if (loading) {
    return <h1>Loading commentaries...</h1>;
  }

  if (error) {
    return <h1>error loading commentaries</h1>;
  }

  if (!data || !data.commentaries) {
    return null;
  }

  return (
    <>
      {data.commentaries.map(commentary => (
        <Commentary
          key={commentary._id}
          commentary={commentary}
          onClickReply={onClickReply}
          onClickDelete={handleDelete}
        />
      ))}
    </>
  );
};

export default Commentaries;
