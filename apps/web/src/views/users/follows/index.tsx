import { NetworkStatus } from '@apollo/client';

import type { FindFollowersQuery, FindFollowingQuery } from '../../../graphql';

import type { FollowsLogicProps } from './logic';

import { useLogic } from './logic';

import ProfilePicture from '../../../components/ProfilePicture';

import ErrorText from '../../../components/ErrorText';

import Observer from '../../../components/Observer';

import LoadingSpinner from '../../../components/LoadingSpinner';

import FollowButton from '../../../components/FollowButton';

interface UserFollowsProps extends FollowsLogicProps {
  followType: 'following' | 'followers';
}

const UserFollows: React.FC<UserFollowsProps> = ({ followType, userId }) => {
  const {
    query: { data, networkStatus },
    handleScroll,
  } = useLogic({ followType, userId });

  if (networkStatus === NetworkStatus.loading) {
    return <LoadingSpinner center />;
  }

  if (networkStatus === NetworkStatus.error) {
    return <ErrorText text="Error loading follows" />;
  }

  return (
    <>
      {(followType === 'followers'
        ? (data as FindFollowersQuery).followers
        : (data as FindFollowingQuery).following
      ).edges.map(follow => (
        <div className="flex gap-2 items-center" key={follow.node.id}>
          <ProfilePicture
            src={follow.node.targetUser.profilePictureUrl}
            imageSize="md"
          />

          <div className="flex flex-col">
            <span className="text-grey-100">
              {follow.node.targetUser.username}
            </span>

            {follow.node.targetUser.realName && (
              <span className="text-grey-200">
                {follow.node.targetUser.realName}
              </span>
            )}
          </div>

          <FollowButton
            className="ml-auto"
            buttonSize="xs"
            full={false}
            targetUserId={follow.node.targetUser.id}
          />
        </div>
      ))}

      {(followType === 'followers'
        ? (data as FindFollowersQuery).followers
        : (data as FindFollowingQuery).following
      ).pageInfo.hasNextPage && (
        <Observer onIntersect={handleScroll}>
          <LoadingSpinner />
        </Observer>
      )}
    </>
  );
};

export default UserFollows;
