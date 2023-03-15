import type { IsFollowingQuery, IsFollowingQueryVariables } from '@/graphql';

import {
  IsFollowingDocument,
  useIsFollowingQuery,
  useFollowMutation,
} from '@/graphql';

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
  const { data } = useIsFollowingQuery({ variables: { userId: targetUserId } });

  const [followMutation] = useFollowMutation();

  const handleFollow = async () => {
    await followMutation({
      variables: { userId: targetUserId },
      update: (cache, response) => {
        cache.updateQuery<IsFollowingQuery, IsFollowingQueryVariables>(
          {
            query: IsFollowingDocument,
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
