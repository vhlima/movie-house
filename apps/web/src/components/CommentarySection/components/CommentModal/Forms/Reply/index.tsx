import { useMutation } from '@apollo/client';

import type { GenericFormHandles } from '../index';

// import type {
//   ReplyResponse,
//   ReplyCacheData,
// } from '../../../../../../types/reply';

// import { REPLIES, REPLY } from '../../../../../../graphql/reply';

import { useAuth } from '../../../../../../hooks/useAuth';

import GenericForm from '../index';

interface ReplyFormProps extends GenericFormHandles {
  commentaryId: string;
}

const ReplyForm: React.FC<ReplyFormProps> = ({ commentaryId, onSubmit }) => {
  const { user } = useAuth();

  // TODO theres a bug when you submit a reply and the commentary dont have any reply yet. it only appears if you refresh the page

  // const [addReply, { loading }] = useMutation<{ reply: ReplyResponse }>(REPLY, {
  //   update: (cache, { data }) => {
  //     const repliesData = cache.readQuery<ReplyCacheData>({
  //       query: REPLIES,
  //       variables: { commentaryId },
  //     });

  //     cache.writeQuery<ReplyCacheData>({
  //       query: REPLIES,
  //       variables: { commentaryId },
  //       data: {
  //         replies: [...(repliesData?.replies || []), data.reply],
  //       },
  //     });
  //   },
  // });

  const loading = false;

  const addReply = async ({ variables: any }) => {
    const a = 1;
  };

  return (
    <GenericForm
      isReply
      loading={loading}
      error={undefined}
      initialValues={{ body: '' }}
      onSubmit={async values => {
        await addReply({
          variables: { userId: user.id, commentaryId, body: values.body },
        });

        onSubmit();
      }}
    />
  );
};

export default ReplyForm;
