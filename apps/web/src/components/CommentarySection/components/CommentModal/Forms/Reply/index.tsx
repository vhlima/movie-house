import { useMutation } from '@apollo/client';

import type { GenericFormHandles } from '../index';

import type {
  AddReplyInput,
  AddReplyResponse,
  FindRepliesCacheInput,
  FindRepliesResponse,
} from '../../../../../../graphql/Reply/types';

import { ADD_REPLY, FIND_REPLIES } from '../../../../../../graphql/Reply';

import GenericForm from '../index';

interface ReplyFormProps extends GenericFormHandles {
  commentaryId: string;
}

const ReplyForm: React.FC<ReplyFormProps> = ({ commentaryId, onSubmit }) => {
  const [addReply, { loading }] = useMutation<
    AddReplyResponse,
    AddReplyInput,
    FindRepliesResponse
  >(ADD_REPLY, {
    update: (cache, { data }) => {
      if (!data) return;

      cache.updateQuery<FindRepliesResponse, FindRepliesCacheInput>(
        {
          query: FIND_REPLIES,
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
