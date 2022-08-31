import type { ModalHandles } from '../../../Modal';

import Modal from '../../../Modal';

import CommentForm from './Forms/Comment';

import ReplyForm from './Forms/Reply';

interface CommentModalProps extends ModalHandles {
  referenceId: string;
  isReply?: boolean;
}

const CommentModal: React.FC<CommentModalProps> = ({
  referenceId,
  isReply,
  onClose,
}) => (
  <Modal backdrop bottom autoStyle={false} showX={false} onClose={onClose}>
    {!isReply ? (
      <CommentForm postId={referenceId} onSubmit={onClose} />
    ) : (
      <ReplyForm commentaryId={referenceId} onSubmit={onClose} />
    )}
  </Modal>
);

export default CommentModal;
