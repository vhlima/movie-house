import { useRouter } from 'next/router';

import { useFindUserProfileStatsQuery } from '../../../../../../graphql';

import { useAuth } from '../../../../../../hooks/useAuth';

import Button from '../../../../../../components/Button';
import FollowButton from '../../../../../../components/FollowButton';

import UserStats from './components/UserStats';

interface UserProfileStatsProps {
  user: {
    id: string;
    username: string;
  };
}

const UserProfileStats: React.FC<UserProfileStatsProps> = ({ user }) => {
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
          <UserStats
            link={{
              href: {
                pathname: '/users/[username]/films',
                query: { username },
              },
            }}
            number={
              profileStatsData
                ? profileStatsData.userProfileStats.moviesWatchedCount
                : 0
            }
            text="Movies"
          />

          <UserStats
            link={{
              href: {
                pathname: '/users/[username]/films',
                query: { username },
              },
            }}
            number={
              profileStatsData
                ? profileStatsData.userProfileStats.moviesWatchedThisYearCount
                : 0
            }
            text="This year"
          />

          <UserStats
            link={{
              href: {
                pathname: '/users/[username]/lists',
                query: { username },
              },
            }}
            number={
              profileStatsData ? profileStatsData.userProfileStats.listCount : 0
            }
            text="Lists"
          />
        </div>

        <div className="flex">
          <UserStats
            link={{
              href: {
                pathname: '/users/[username]/following',
                query: { username },
              },
            }}
            number={
              profileStatsData
                ? profileStatsData.userProfileStats.followingCount
                : 0
            }
            text="Following"
          />

          <UserStats
            link={{
              href: {
                pathname: '/users/[username]/followers',
                query: { username },
              },
            }}
            number={
              profileStatsData
                ? profileStatsData.userProfileStats.followerCount
                : 0
            }
            text="Followers"
          />
        </div>
      </div>
    </>
  );
};

export default UserProfileStats;
