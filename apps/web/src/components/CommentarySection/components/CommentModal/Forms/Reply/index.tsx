import { useMutation } from '@apollo/client';

import type { GenericFormHandles } from '../index';

import type {
  ReplyResponse,
  ReplyCacheData,
} from '../../../../../../types/reply';

import { REPLIES, REPLY } from '../../../../../../graphql/reply';

import { useAuth } from '../../../../../../hooks/useAuth';

import GenericForm from '../index';

interface ReplyFormProps extends GenericFormHandles {
  commentaryId: string;
}

const ReplyForm: React.FC<ReplyFormProps> = ({ commentaryId, onSubmit }) => {
  const { user } = useAuth();

  const [addReply, { loading }] = useMutation<{ reply: ReplyResponse }>(REPLY, {
    update: (cache, { data }) => {
      const repliesData = cache.readQuery<ReplyCacheData>({
        query: REPLIES,
        variables: { commentaryId },
      });

      cache.writeQuery<ReplyCacheData>({
        query: REPLIES,
        variables: { commentaryId },
        data: {
          replies: [...(repliesData?.replies || []), data.reply],
        },
      });
    },
  });

  return (
    <GenericForm
      isReply
      loading={loading}
      initialValues={{ body: '' }}
      onSubmit={async values => {
        await addReply({
          variables: { userId: user._id, commentaryId, body: values.body },
        });

        onSubmit();
      }}
    />
  );
};

export default ReplyForm;
