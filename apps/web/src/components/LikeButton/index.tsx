import { useState } from 'react';

import { useMutation } from '@apollo/client';

import clsx from 'clsx';

import type { LikeResponse, LikeInput } from '../../graphql/Like/types';

import { LIKE_CONTENT } from '../../graphql/Like';

import { useAuth } from '../../hooks/useAuth';

import SvgIcon from '../SvgIcon';

export interface LikeButtonProps {
  likeCount: number;
  // Root id means wich content the user is going to like ex: any post id or commentary
  rootId: string;
  // Reference id means where the content id to be liked ex: commentary.id or reply.id
  referenceId?: string;
  hasLiked?: boolean;
}

const LikeButton: React.FC<LikeButtonProps> = ({
  rootId,
  referenceId,
  likeCount,
  hasLiked,
}) => {
  const { user } = useAuth();

  const [liked, setLiked] = useState<boolean>(hasLiked);

  const [likeOrDislikeMutation, { loading }] = useMutation<
    LikeResponse,
    LikeInput
  >(LIKE_CONTENT);

  const handleLike = async () => {
    if (!user) return;

    const { data } = await likeOrDislikeMutation({
      variables: {
        rootId,
        referenceId,
      },
    });

    setLiked(data.like);
  };

  return (
    <div className="flex items-center gap-1">
      <button type="button" onClick={handleLike} disabled={loading}>
        <SvgIcon
          className={clsx({
            'text-grey-300 group-hover:text-grey-400': !liked,
            'text-danger-base group-hover:text-danger-light': liked,
          })}
          iconType="AiFillHeart"
          size={24}
        />
      </button>

      <span className="text-grey-200 font-semibold group-hover:text-grey-300">
        {likeCount +
          (!hasLiked && liked ? 1 : 0) -
          (hasLiked && !liked ? 1 : 0)}
      </span>
    </div>
  );
};

export default LikeButton;
