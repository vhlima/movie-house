import { useMutation } from '@apollo/client';

import type {
  CommentaryCacheData,
  CommentaryResponse,
} from '../../../../../../types/commentary';

import type { GenericFormHandles } from '../index';

import { COMMENT, COMMENTARIES } from '../../../../../../graphql/commentary';

import { useAuth } from '../../../../../../hooks/useAuth';

import GenericForm from '../index';

interface CommentProps extends GenericFormHandles {
  postId: string;
}

const CommentForm: React.FC<CommentProps> = ({ postId, onSubmit }) => {
  const { user } = useAuth();

  const [addComment, { loading }] = useMutation<{
    comment: CommentaryResponse;
  }>(COMMENT, {
    update: (cache, { data }) => {
      const commentariesData = cache.readQuery<CommentaryCacheData>({
        query: COMMENTARIES,
        variables: { postId },
      });

      cache.writeQuery<CommentaryCacheData>({
        query: COMMENTARIES,
        variables: { postId },
        data: {
          commentaries: [
            ...(commentariesData?.commentaries || []),
            data.comment,
          ],
        },
      });
    },
  });

  return (
    <GenericForm
      loading={loading}
      initialValues={{ body: '' }}
      onSubmit={async values => {
        await addComment({
          variables: { userId: user._id, postId, body: values.body },
        });

        onSubmit();
      }}
    />
  );
};

export default CommentForm;
