import { useState } from 'react';

import clsx from 'clsx';

import { LikeType, useLikeOrDislikeMutation } from '@/graphql';

import { useAuth } from '@/hooks/useAuth';

import SvgIcon from '../SvgIcon';

export interface LikeButtonProps {
  likeCount: number;
  rootId: string;
  likeType?: LikeType;
  hasLiked?: boolean;
}

const LikeButton: React.FC<LikeButtonProps> = ({
  rootId,
  likeType = LikeType.Post,
  likeCount,
  hasLiked,
}) => {
  const { data: session } = useAuth();

  const [liked, setLiked] = useState<boolean>(hasLiked);

  const [likeOrDislikeMutation, { loading }] = useLikeOrDislikeMutation();

  const handleLike = async () => {
    if (!session) return;

    const { data } = await likeOrDislikeMutation({
      variables: {
        contentId: rootId,
        likeType,
      },
    });

    setLiked(data.likeOrDislike);
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
