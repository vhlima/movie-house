import type {
  FindCommentariesQuery,
  FindCommentariesQueryVariables,
} from '../../../../../../graphql';

import {
  FindCommentariesDocument,
  useAddCommentaryMutation,
} from '../../../../../../graphql';

import type { GenericFormHandles } from '../index';

import GenericForm from '../index';

interface CommentProps extends GenericFormHandles {
  postId: string;
}

const CommentForm: React.FC<CommentProps> = ({ postId, onSubmit }) => {
  const [addComment, { loading, error }] = useAddCommentaryMutation({
    update: (cache, { data }) => {
      if (!data) return;

      cache.updateQuery<FindCommentariesQuery, FindCommentariesQueryVariables>(
        {
          query: FindCommentariesDocument,
        },
        cacheData => ({
          commentaries: {
            pageInfo: cacheData.commentaries.pageInfo,
            edges: [
              ...cacheData.commentaries.edges,
              {
                cursor: data.comment.createdAt,
                node: data.comment,
              },
            ],
          },
        }),
      );
    },
  });

  return (
    <GenericForm
      loading={loading}
      initialValues={{ body: '' }}
      error={error}
      onSubmit={async values => {
        const { errors } = await addComment({
          variables: {
            postId,
            body: values.body,
          },
        });

        if (!errors) {
          onSubmit();
        }
      }}
    />
  );
};

export default CommentForm;
