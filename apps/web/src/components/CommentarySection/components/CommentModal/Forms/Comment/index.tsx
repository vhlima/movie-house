import { useMutation } from '@apollo/client';

import type {
  AddCommentaryResponse,
  AddCommentaryInput,
  FindCommentariesResponse,
  FindCommentariesInput,
} from '../../../../../../graphql/Commentary/types';

import {
  ADD_COMMENTARY,
  FIND_COMMENTARIES,
} from '../../../../../../graphql/Commentary';

import type { GenericFormHandles } from '../index';

import GenericForm from '../index';

interface CommentProps extends GenericFormHandles {
  postId: string;
}

const CommentForm: React.FC<CommentProps> = ({ postId, onSubmit }) => {
  const [addComment, { loading, error }] = useMutation<
    AddCommentaryResponse,
    AddCommentaryInput,
    FindCommentariesResponse
  >(ADD_COMMENTARY, {
    update: (cache, { data }) => {
      if (!data) return;

      cache.updateQuery<FindCommentariesResponse, FindCommentariesInput>(
        {
          query: FIND_COMMENTARIES,
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
