import { useEffect } from 'react';

import { useLazyQuery } from '@apollo/client';

import type { ReplyData, ReplyResponse } from '../../../../graphql/Reply/types';

// import type { ReplyResponse } from '../../../../types/reply';

// import { REPLIES } from '../../../../graphql/reply';

import CommentaryBody from '../components/Body';

// interface ReplyHandles {
//   addReply: (reply: ReplyResponse) => void;
// }

interface RepliesProps {
  commentaryId: string;
  load?: boolean;
}

const Replies: React.FC<RepliesProps> = ({ commentaryId, load }) => {
  // const [loadReplies, { called, loading, data, error }] = useLazyQuery<ReplyResponse>(FIND_REPLIES, {
  //   variables: { commentaryId },
  // });

  // useEffect(() => {
  //   if (!data && load) {
  //     loadReplies();
  //   }
  // }, [data, load]);

  // if (called && loading) {
  //   return <h1>Loading replies..</h1>;
  // }

  // if (error) {
  //   return <h1 className="text-danger-base">Error loading replies</h1>;
  // }

  // if (!load || !called || !data || data.replies.length <= 0) {
  //   return null;
  // }

  const a = 1;

  return (
    <div>
      {/* {data.replies.map(reply => (
        <CommentaryBody
          key={reply._id}
          user={reply.user}
          body={reply.body}
          createdAt={reply.createdAt}
          isReply
        />
      ))} */}
    </div>
  );
};

export default Replies;