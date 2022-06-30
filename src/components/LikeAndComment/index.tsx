import React, { useMemo } from 'react';

import clsx from 'clsx';

import { MotionProps, motion } from 'framer-motion';

import { AiFillHeart } from 'react-icons/ai';

import { BsFillChatLeftFill } from 'react-icons/bs';

interface LikeAndCommentProps {
  likes: number;
  commentaries: number;
  liked?: boolean;
  onLike: () => void;
  reply?: boolean;
}

const LikeAndComment: React.FC<LikeAndCommentProps> = ({
  likes,
  commentaries,
  liked = false,
  reply = false,
  onLike,
}) => {
  const tst: MotionProps = {
    initial: liked ? 'checked' : 'checked',
    animate: liked ? 'checked' : 'unchecked',
    variants: {
      // checked: { scale: 2, transition: { duration: 0.5 } },
      // unchecked: {
      //   y: [0, -10, 0],
      //   transition: { duration: 0.5 },
      // },
    },
  };

  // const likeAnimation: MotionProps = useMemo(() => ({}), [liked]);

  return (
    <div className="flex gap-2">
      <div className="flex items-center gap-1">
        <motion.button type="button" onClick={onLike} {...tst}>
          <AiFillHeart
            className={clsx({
              'text-grey-300 group-hover:text-grey-400': !liked,
              'text-danger-base group-hover:text-danger-light': liked,
            })}
            size={24}
          />
        </motion.button>

        <span className="text-grey-200 font-semibold group-hover:text-grey-300">
          {likes}
        </span>
      </div>

      {!reply ? (
        <div className="flex items-center gap-1 cursor-pointer group">
          <BsFillChatLeftFill
            className="text-grey-300 group-hover:text-grey-400 mt-0.5"
            size={20}
          />

          <span className="text-grey-200 font-semibold group-hover:text-grey-300">
            {commentaries}
          </span>
        </div>
      ) : (
        <>
          <span className="text-grey-200">•</span>

          <button
            className="flex items-center gap-1 cursor-pointer group"
            type="button"
          >
            <span className="text-grey-200 font-semibold group-hover:text-grey-300">
              Reply
            </span>
          </button>
        </>
      )}
    </div>
  );
};

export default LikeAndComment;
