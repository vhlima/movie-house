import { useMutation, useQuery } from '@apollo/client';

import {
  FollowInput,
  FollowResponse,
  IsFollowingInput,
  IsFollowingResponse,
} from '../../graphql/Follow/types';

import { FOLLOW, IS_FOLLOWING } from '../../graphql/Follow';

import type { ButtonProps } from '../Button';

import Button from '../Button';

interface FollowButtonProps
  extends Omit<ButtonProps, 'buttonStyle' | 'onClick'> {
  targetUserId: string;
  onFollow?: () => Promise<void>;
}

const FollowButton: React.FC<FollowButtonProps> = ({
  targetUserId,
  onFollow,
  ...buttonProps
}) => {
  const { data } = useQuery<IsFollowingResponse, IsFollowingInput>(
    IS_FOLLOWING,
    { variables: { userId: targetUserId } },
  );

  const [followMutation] = useMutation<FollowResponse, FollowInput>(FOLLOW);

  const handleFollow = async () => {
    await followMutation({
      variables: { userId: targetUserId },
      update: (cache, response) => {
        cache.updateQuery<IsFollowingResponse>(
          {
            query: IS_FOLLOWING,
            variables: { userId: targetUserId },
          },
          cacheData => ({
            isFollowing: !response.data
              ? cacheData.isFollowing
              : response.data.follow,
          }),
        );
      },
    });

    if (onFollow) {
      await onFollow();
    }
  };

  return (
    <Button
      buttonStyle={data?.isFollowing ? 'danger' : 'secondary'}
      onClick={handleFollow}
      {...buttonProps}
    >
      {!data?.isFollowing ? 'Follow' : 'Unfollow'}
    </Button>
  );
};

export default FollowButton;
