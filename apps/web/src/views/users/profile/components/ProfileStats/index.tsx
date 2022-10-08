import { useRouter } from 'next/router';

import { useFindUserProfileQuery } from '../../../../../graphql';

import { useAuth } from '../../../../../hooks/useAuth';

import { useProfile } from '../../hooks/useProfile';

import Stats from './components/Stats';

import Button from '../../../../../components/Button';

import ErrorText from '../../../../../components/ErrorText';
import FollowButton from '../../../../../components/FollowButton';

const ProfileStats: React.FC = () => {
  const { user: authUser } = useAuth();

  const { user } = useProfile();

  const { push } = useRouter();

  const { data, error, refetch } = useFindUserProfileQuery({
    variables: { userId: user.id },
  });

  if (error) {
    return <ErrorText text={`Error loading profile stats ${error.message}`} />;
  }

  const isOwnProfile = authUser && authUser.id === user.id;

  return (
    <>
      <div className="flex gap-2 justify-center">
        {!isOwnProfile ? (
          <>
            <FollowButton
              buttonSize="xs"
              targetUserId={user.id}
              onFollow={async () => {
                await refetch();
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
            number={data ? data.userProfile.moviesWatchedCount : 0}
            text="Movies"
          />

          <Stats
            link={{ href: '/' }}
            number={data ? data.userProfile.moviesWatchedThisYearCount : 0}
            text="This year"
          />

          <Stats
            link={{
              href: {
                pathname: '/users/[username]/lists',
                query: { username: user.username },
              },
            }}
            number={data ? data.userProfile.listCount : 0}
            text="Lists"
          />
        </div>

        <div className="flex">
          <Stats
            link={{
              href: {
                pathname: '/users/[username]/following',
                query: { username: user.username },
              },
            }}
            number={data ? data.userProfile.followingCount : 0}
            text="Following"
          />

          <Stats
            link={{
              href: {
                pathname: '/users/[username]/followers',
                query: { username: user.username },
              },
            }}
            number={data ? data.userProfile.followerCount : 0}
            text="Followers"
          />
        </div>
      </div>
    </>
  );
};

export default ProfileStats;
