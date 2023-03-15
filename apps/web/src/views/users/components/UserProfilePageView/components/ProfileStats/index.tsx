import { useFindProfileStatsQuery } from '@/graphql';

import { useAuth } from '@/hooks/useAuth';

import { useProfile } from '@/views/users/hooks/useProfile';

import { Button } from '@/components';
import FollowButton from '../../../../../../components/FollowButton';

import UserStats from './components/UserStats';

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

export const ProfileStats: React.FC = () => {
  const { data: session } = useAuth();

  const { user } = useProfile();

  const { data: profileStatsData } = useFindProfileStatsQuery({
    variables: { userId: user.id },
  });

  const { id, username } = user;

  const isOwnProfile = session && session.user.id === id;

  return (
    <>
      <div className="flex gap-2 justify-center">
        {!isOwnProfile ? (
          <>
            <FollowButton
              targetUserId={id}
              onFollow={async () => {
                // await refetch();
              }}
            />

            <Button intent="secondary">Message</Button>
          </>
        ) : (
          <Button intent="secondary" href="/settings">
            Profile Settings
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
                  : profileStatsData.profileStats[stats.attributeKey]
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
                  : profileStatsData.profileStats[stats.attributeKey]
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
