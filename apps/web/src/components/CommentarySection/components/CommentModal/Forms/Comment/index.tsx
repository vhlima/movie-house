import { gql, useMutation } from '@apollo/client';

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

  const [addComment, { loading }] = useMutation<
    {
      comment: CommentaryResponse;
    },
    unknown,
    CommentaryCacheData
  >(COMMENT, {
    update: (cache, { data }) => {
      // cache.updateQuery<CommentaryCacheData>(
      //   {
      //     query: gql`
      //       query FindCommentaries {
      //         commentaries {
      //           currentPage
      //           hasNextPage
      //           commentaries {
      //             _id
      //             postId
      //             body
      //             replyCount
      //             likeCount
      //             createdAt
      //             updatedAt
      //             user {
      //               _id
      //               username
      //               profilePicture
      //             }
      //           }
      //         }
      //       }
      //     `,
      //     // variables: { commentaryId: data.comment._id },
      //   },
      //   cacheData => {
      //     console.log(`cache data? ${JSON.stringify(cacheData || {})}`);

      //     return {
      //       commentaries: {
      //         currentPage: cacheData?.commentaries?.currentPage || 1,
      //         hasNextPage: cacheData?.commentaries?.hasNextPage || false,
      //         commentaries: [
      //           ...(cacheData?.commentaries?.commentaries || []),
      //           data.comment,
      //         ],
      //       },
      //     };
      //   },
      // );

      const commentariesData = cache.readQuery<CommentaryCacheData>({
        query: COMMENTARIES,
        variables: { postId },
      });

      console.log(
        `commentaries data? ${JSON.stringify(commentariesData || {})}`,
      );

      // cache.writeQuery<CommentaryCacheData>({
      //   query: COMMENTARIES,
      //   variables: { postId },
      //   data: {
      //     // commentaries: [
      //     //   ...(commentariesData?.commentaries || []),
      //     //   data.comment,
      //     // ],
      //     commentaries: {
      //       currentPage: ctx.context?.commentaries?.currentPage || 1,
      //       hasNextPage: ctx.context?.commentaries?.hasNextPage || false,
      //       commentaries: [
      //         ...(ctx.context?.commentaries.commentaries || []),
      //         data.comment,
      //       ],
      //     },
      //   },
      // });
    },
  });

  return (
    <GenericForm
      loading={loading}
      initialValues={{ body: '' }}
      onSubmit={async values => {
        addComment({
          variables: {
            userId: user._id,
            postId,
            body: values.body,
          },
        });

        onSubmit();
      }}
    />
  );
};

export default CommentForm;
