import { useRouter } from 'next/router';

import { useAuth } from '../../../../../hooks/useAuth';

import { useProfile } from '../../hooks/useProfile';

import Button from '../../../../../components/Button';

const ProfileButtons: React.FC = () => {
  const { user: authUser } = useAuth();

  const { user } = useProfile();

  const { push } = useRouter();

  const isOwnProfile = authUser && authUser.id === user.id;

  // const isFollowing = authUser && authUser.following.includes(user.id);

  const isFollowing = false;

  return (
    <div className="flex gap-2 justify-center">
      {!isOwnProfile ? (
        <>
          <Button
            buttonStyle="secondary"
            buttonSize="xs"
            // onClick={() => !isFollowing ? followUser(user._id) : unfollowUser(user._id)}
          >
            {!isFollowing ? 'Follow' : 'Unfollow'}
          </Button>

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
  );
};

export default ProfileButtons;
