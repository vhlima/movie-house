import clsx from 'clsx';

import { useMutation } from '@apollo/client';

import { motion } from 'framer-motion';

// import type { MotionProps } from 'framer-motion';

import { LikeType } from '../../types/likes';

import type { LikeInput, LikeResponse } from '../../types/likes';

import { LIKE_OR_DISLIKE } from '../../graphql/like';

import SvgIcon from '../SvgIcon';
import { useAuth } from '../../hooks/useAuth';

export interface LikeButtonProps {
  // Reference id means wich content the user is going to like ex: any post id or commentary
  referenceId: string;
  liked?: boolean;
  likes: number;
  onLike: (likeOrDislike: boolean) => void;
}

const LikeButton: React.FC<LikeButtonProps> = ({
  referenceId,
  likes,
  liked,
  onLike,
}) => {
  // const tst: MotionProps = {
  //   initial: liked ? 'checked' : 'checked',
  //   animate: liked ? 'checked' : 'unchecked',
  //   variants: {
  //     checked: { scale: 2, transition: { duration: 0.5 } },
  //     unchecked: {
  //       y: [0, -10, 0],
  //       transition: { duration: 0.5 },
  //     },
  //   },
  // };

  // TODO user required

  const { user } = useAuth();

  const [likeOrDislikeMutation, { loading }] = useMutation<
    LikeResponse,
    LikeInput
  >(LIKE_OR_DISLIKE);

  const handleLike = async () => {
    if (!user) return;

    const { data } = await likeOrDislikeMutation({
      variables: {
        likeType: LikeType.POST,
        userId: user._id,
        referenceId,
      },
    });

    onLike(data.likeOrDislike);
  };

  return (
    <div className="flex items-center gap-1">
      <motion.button type="button" onClick={handleLike} disabled={loading}>
        <SvgIcon
          className={clsx({
            'text-grey-300 group-hover:text-grey-400': !liked,
            'text-danger-base group-hover:text-danger-light': liked,
          })}
          iconType="AiFillHeart"
          size={24}
        />
      </motion.button>

      <span className="text-grey-200 font-semibold group-hover:text-grey-300">
        {likes}
      </span>
    </div>
  );
};

export default LikeButton;
