import { useMutation } from '@apollo/client';

import type { GenericFormHandles } from '../index';

import type {
  AddReplyInput,
  AddReplyResponse,
  FindRepliesCacheInput,
  FindRepliesResponse,
} from '../../../../../../graphql/Reply/types';

import type {
  FindCommentariesInput,
  FindCommentariesResponse,
} from '../../../../../../graphql/Commentary/types';

import { ADD_REPLY, FIND_REPLIES } from '../../../../../../graphql/Reply';

import { FIND_COMMENTARIES } from '../../../../../../graphql/Commentary';

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
              ? cacheData.replies.pageInfo
              : {
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

      // TODO find a better way to handle that
      //   cache.updateQuery<FindCommentariesResponse, FindCommentariesInput>(
      //     {
      //       query: FIND_COMMENTARIES,
      //     },
      //     cacheData => {
      //       if (!cacheData) return null;

      //       const commentaryIndex = cacheData.commentaries.edges.findIndex(
      //         edg => edg.node.id === commentaryId,
      //       );

      //       if (commentaryIndex < 0) return null;

      //       const commentary = cacheData.commentaries.edges[commentaryIndex];

      //       commentary.node.replyCount += 1;

      //       const modifiedEdges = [...cacheData.commentaries.edges];

      //       modifiedEdges[commentaryIndex] = commentary;

      //       return {
      //         commentaries: {
      //           pageInfo: cacheData.commentaries.pageInfo,
      //           edges: modifiedEdges,
      //         },
      //       };
      //     },
      //   );
    },
  });

  return (
    <GenericForm
      isReply
      loading={loading}
      error={undefined}
      initialValues={{ body: '' }}
      onSubmit={async values => {
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
