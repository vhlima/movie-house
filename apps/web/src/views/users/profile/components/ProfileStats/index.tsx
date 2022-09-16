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

  const { data, loading, error, refetch } = useFindUserProfileQuery({
    variables: { userId: user.id },
  });

  if (error) {
    return <ErrorText text={`Error loading profile stats ${error.message}`} />;
  }

  if (loading) {
    return <h1>loading</h1>;
  }

  const isOwnProfile = authUser && authUser.id === user.id;

  return (
    <>
      <div className="flex gap-2 justify-center">
        {isOwnProfile ? (
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
            number={data.userProfile.moviesWatchedCount}
            text="Movies"
          />

          <Stats
            link={{ href: '/' }}
            number={data.userProfile.moviesWatchedThisYearCount}
            text="This year"
          />

          <Stats
            link={{ href: '/' }}
            number={data.userProfile.listCount}
            text="Lists"
          />
        </div>

        <div className="flex">
          <Stats
            link={{
              href: {
                pathname: '/users/[id]/following',
                query: { id: user.id },
              },
            }}
            number={data.userProfile.followingCount}
            text="Following"
          />

          <Stats
            link={{
              href: {
                pathname: '/users/[id]/followers',
                query: { id: user.id },
              },
            }}
            number={data.userProfile.followerCount}
            text="Followers"
          />
        </div>
      </div>
    </>
  );
};

export default ProfileStats;
