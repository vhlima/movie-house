import { useState } from 'react';

import clsx from 'clsx';

import { useAuth } from '@/hooks/useAuth';

import { LikeType, useLikeOrDislikeMutation } from '@/graphql';

import { SvgIcon, Typography } from '@/components';

export interface LikeButtonProps {
  postId: string;
  likeType: LikeType;
  hasLiked?: boolean;
}

export const LikeButton: React.FC<LikeButtonProps> = ({
  postId,
  likeType,
  hasLiked,
}) => {
  const { data: session } = useAuth();

  const [liked, setLiked] = useState<boolean>(hasLiked);

  const [likeOrDislikeMutation] = useLikeOrDislikeMutation({
    errorPolicy: 'ignore',
  });

  const handleLike = async () => {
    if (!session) {
      return;
    }

    const { data } = await likeOrDislikeMutation({
      variables: {
        contentId: postId,
        likeType,
      },
    });

    if (data) {
      setLiked(data.likeOrDislike);
    }
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
  );
};
