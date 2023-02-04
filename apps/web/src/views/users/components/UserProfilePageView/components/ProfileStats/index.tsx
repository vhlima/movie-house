import { useRouter } from 'next/router';

import { useFindUserProfileStatsQuery } from '../../../../../../graphql';

import { useAuth } from '../../../../../../hooks/useAuth';

import Button from '../../../../../../components/Button';
import FollowButton from '../../../../../../components/FollowButton';

import UserStats from './components/UserStats';

interface ProfileStatsProps {
  user: {
    id: string;
    username: string;
  };
}

const profileStats = [
  {
    text: 'Movies',
    attributeKey: 'moviesWatchedCount',
    pathname: '/users/[username]/films',
  },
  {
    text: 'This year',
    attributeKey: 'moviesWatchedThisYearCount',
    pathname: '/users/[username]/films',
  },
  {
    text: 'Lists',
    attributeKey: 'listCount',
    pathname: '/users/[username]/lists',
  },
];

const followStats = [
  {
    text: 'Following',
    attributeKey: 'followingCount',
    pathname: '/users/[username]/following',
  },
  {
    text: 'Followers',
    attributeKey: 'followerCount',
    pathname: '/users/[username]/followers',
  },
];

const ProfileStats: React.FC<ProfileStatsProps> = ({ user }) => {
  const { data: session } = useAuth();

  const { data: profileStatsData } = useFindUserProfileStatsQuery({
    variables: { userId: user.id },
  });

  const { push } = useRouter();

  const { id, username } = user;

  const isOwnProfile = session && session.user.id === id;

  return (
    <>
      <div className="flex gap-2 justify-center">
        {!isOwnProfile ? (
          <>
            <FollowButton
              buttonSize="xs"
              targetUserId={id}
              onFollow={async () => {
                // await refetch();
              }}
            />

            <Button buttonStyle="secondary" buttonSize="xs">
              Message
            </Button>
          </>
        ) : (
          <Button
            buttonStyle="secondary"
            buttonSize="xs"
            onClick={() => push('/settings')}
          >
            Profile settings
          </Button>
        )}
      </div>

      <div className="flex flex-col items-center gap-2">
        <div className="flex">
          {profileStats.map(stats => (
            <UserStats
              key={`user-profile-stats-${stats.text}`}
              text={stats.text}
              number={
                !profileStatsData
                  ? 0
                  : profileStatsData.userProfileStats[stats.attributeKey]
              }
              link={{
                href: {
                  pathname: stats.pathname,
                  query: {
                    username,
                  },
                },
              }}
            />
          ))}
        </div>

        <div className="flex">
          {followStats.map(stats => (
            <UserStats
              key={`user-profile-stats-${stats.text}`}
              text={stats.text}
              number={
                !profileStatsData
                  ? 0
                  : profileStatsData.userProfileStats[stats.attributeKey]
              }
              link={{
                href: {
                  pathname: stats.pathname,
                  query: { username },
                },
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProfileStats;
