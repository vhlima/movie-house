import { useRouter } from 'next/router';

import { useFindUserProfileStatsQuery } from '../../../../../graphql';

import { useAuth } from '../../../../../hooks/useAuth';

import { useProfile } from '../../hooks/useProfile';

import Stats from './components/Stats';

import Button from '../../../../../components/Button';

import FollowButton from '../../../../../components/FollowButton';

const ProfileStats: React.FC = () => {
  const { data: session } = useAuth();

  const { user: userProfile } = useProfile();

  const { data: profileStatsData } = useFindUserProfileStatsQuery({
    variables: { userId: userProfile.id },
  });

  const { push } = useRouter();

  const isOwnProfile = session && session.user.id === userProfile?.id;

  return (
    <>
      <div className="flex gap-2 justify-center">
        {!isOwnProfile ? (
          <>
            <FollowButton
              buttonSize="xs"
              targetUserId={userProfile?.id}
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
          <Stats
            link={{ href: '/' }}
            number={
              profileStatsData
                ? profileStatsData.userProfileStats.moviesWatchedCount
                : 0
            }
            text="Movies"
          />

          <Stats
            link={{ href: '/' }}
            number={
              profileStatsData
                ? profileStatsData.userProfileStats.moviesWatchedThisYearCount
                : 0
            }
            text="This year"
          />

          <Stats
            link={{
              href: {
                pathname: '/users/[username]/lists',
                query: { username: userProfile?.username },
              },
            }}
            number={
              profileStatsData ? profileStatsData.userProfileStats.listCount : 0
            }
            text="Lists"
          />
        </div>

        <div className="flex">
          <Stats
            link={{
              href: {
                pathname: '/users/[username]/following',
                query: { username: userProfile?.username },
              },
            }}
            number={
              profileStatsData
                ? profileStatsData.userProfileStats.followingCount
                : 0
            }
            text="Following"
          />

          <Stats
            link={{
              href: {
                pathname: '/users/[username]/followers',
                query: { username: userProfile?.username },
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

export default ProfileStats;
