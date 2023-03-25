import { useState } from 'react';

import clsx from 'clsx';

import { LikeType, useLikeOrDislikeMutation } from '@/graphql';

import { useAuth } from '@/hooks/useAuth';

import { SvgIcon, Typography } from '@/components';

export interface LikeButtonProps {
  contentId: string;
  likeType: LikeType;
  hasLiked?: boolean;
}

export const LikeButton: React.FC<LikeButtonProps> = ({
  contentId,
  likeType,
  hasLiked,
}) => {
  const { data: session } = useAuth();

  const [liked, setLiked] = useState<boolean>(hasLiked);

  const [likeOrDislikeMutation] = useLikeOrDislikeMutation();

  const handleLike = async () => {
    if (!session) return;

    const { data } = await likeOrDislikeMutation({
      variables: {
        contentId,
        likeType,
      },
    });

    setLiked(data.likeOrDislike);
  };

  return (
    <button
      className="flex items-center gap-1 w-16"
      type="button"
      onClick={handleLike}
    >
      <SvgIcon
        className={clsx({
          'text-danger-base': liked,
        })}
        size={24}
        iconType="AiFillHeart"
      />
      <Typography
        className={clsx({
          'font-medium': !liked,
          'font-bold': liked,
        })}
        component="span"
        size="sm"
      >
        {liked ? 'Liked' : 'Like'}
      </Typography>
    </button>

    // <div className="flex items-center gap-1">
    //   <button type="button" onClick={handleLike} disabled={loading}>
    //     <SvgIcon
    //       className={clsx({
    //         'text-grey-300 group-hover:text-grey-400': !liked,
    //         'text-danger-base group-hover:text-danger-light': liked,
    //       })}
    //       iconType="AiFillHeart"
    //       size={24}
    //     />
    //   </button>

    //   <span className="text-grey-200 font-semibold group-hover:text-grey-300">
    //     {likeCount +
    //       (!hasLiked && liked ? 1 : 0) -
    //       (hasLiked && !liked ? 1 : 0)}
    //   </span>
    // </div>
  );
};
