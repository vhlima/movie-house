import React from 'react';

import clsx from 'clsx';

import { AiFillHeart } from 'react-icons/ai';

import { BsFillChatLeftFill } from 'react-icons/bs';

interface LikeAndCommentProps {
  likes: number;
  commentaries: number;
  liked?: boolean;
}

const LikeAndComment: React.FC<LikeAndCommentProps> = ({
  likes,
  commentaries,
  liked,
}) => (
  <div className="flex gap-2">
    <div className="flex items-center gap-1 group cursor-pointer">
      <AiFillHeart
        className={clsx({
          'text-grey-300 group-hover:text-grey-400': !liked,
          'text-danger-base group-hover:text-danger-light': liked,
        })}
        size={20}
      />

      <span className="text-grey-200 font-semibold group-hover:text-grey-300">
        {likes}
      </span>
    </div>

    <div className="flex items-center gap-1 cursor-pointer group">
      <BsFillChatLeftFill
        className="text-grey-300 group-hover:text-grey-400 mt-0.5"
        size={16}
      />

      <span className="text-grey-200 font-semibold group-hover:text-grey-300">
        {commentaries}
      </span>
    </div>
  </div>
);

export default LikeAndComment;
