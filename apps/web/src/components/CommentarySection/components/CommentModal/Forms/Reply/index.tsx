import type { GenericFormHandles } from '../index';

import type {
  FindRepliesQuery,
  FindRepliesQueryVariables,
} from '../../../../../../graphql';

import {
  FindRepliesDocument,
  useAddReplyMutation,
} from '../../../../../../graphql';

import GenericForm from '../index';

interface ReplyFormProps extends GenericFormHandles {
  commentaryId: string;
}

const ReplyForm: React.FC<ReplyFormProps> = ({ commentaryId, onSubmit }) => {
  const [addReply, { loading }] = useAddReplyMutation({
    update: (cache, { data }) => {
      if (!data) return;
      cache.updateQuery<
        FindRepliesQuery,
        Omit<FindRepliesQueryVariables, 'first' | 'after'>
      >(
        {
          query: FindRepliesDocument,
          variables: { commentaryId },
        },
        cacheData => ({
          replies: {
            pageInfo: cacheData
              ? {
                  ...cacheData.replies.pageInfo,
                  maxItems: cacheData.replies.pageInfo.maxItems + 1,
                }
              : {
                  maxItems: 1,
                  endCursor: null,
                  hasNextPage: false,
                },
            edges: [
              ...(cacheData ? cacheData.replies.edges : []),
              {
                cursor: data.reply.createdAt,
                node: data.reply,
              },
            ],
          },
        }),
      );
    },
  });

  return (
    <GenericForm
      isReply
      loading={loading}
      error={undefined}
      initialValues={{ body: '' }}
      onSubmit={async values => {
        if (loading) return;

        const { errors } = await addReply({
          variables: {
            commentaryId,
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

export default ReplyForm;
