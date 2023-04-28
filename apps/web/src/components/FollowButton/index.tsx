import type { IsFollowingQuery, IsFollowingQueryVariables } from '@/gql';

import {
  IsFollowingDocument,
  useIsFollowingQuery,
  useFollowMutation,
} from '@/gql';

import { Button } from '@/components';

interface FollowButtonProps {
  className?: string;
  targetUserId: string;
  onFollow?: () => Promise<void>;
}

const FollowButton: React.FC<FollowButtonProps> = ({
  className,
  targetUserId,
  onFollow,
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
      intent={data?.isFollowing ? 'danger' : 'secondary'}
      onClick={handleFollow}
      className={className}
    >
      {!data?.isFollowing ? 'Follow' : 'Unfollow'}
    </Button>
  );
};

export default FollowButton;
